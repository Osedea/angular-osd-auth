(function () {

    'use strict';

    angular.module('osdAuth', []);

}());

(function () {

    'use strict';

    // @ngInject
    function OsdAuthConfig() {
        var self = {};

        self.uses = {
            constant: 0,
            request: 1
        };

        self.config = {
            constant: 'CURRENT_USER',
            groupKey: 'name',
            login: '/api/v1/auth/login',
            logout: '/api/v1/auth/logout',
            register: '/api/v1/auth/register',
            request: '/api/v1/auth/current',
            use: self.uses.constant
        };

        self.setGroupKey = function (groupKey) {
            self.config.groupKey = groupKey;
        };

        self.setLogin = function (login) {
            self.config.login = login;
        };

        self.setLogout = function (logout) {
            self.config.logout = logout;
        };

        self.setRegister = function (register) {
            self.config.register = register;
        };

        self.setUseConstant = function (constant) {
            self.config.use = self.uses.constant;
            self.config.constant = constant;
        };

        self.setUseRequest = function (request) {
            self.config.use = self.uses.request;
            self.config.request = request;
        };

        self.$get = function () {
            return self;
        };

        return self;
    }

    angular.module('osdAuth')
        .provider('OsdAuthConfig', OsdAuthConfig);
}());

(function () {

    'use strict';

    /**
     * Function executed each time the module is bootstrapped.
     * We use it to store the current user in our data service.
     */
    function run($http, $injector, $q, $rootScope, OsdAuthConfig, OsdAuthUser) {
        var config = OsdAuthConfig.config;
        var uses = OsdAuthConfig.uses;
        var getUser = function () {
            if (config.use === uses.constant) {
                return $injector.get(config.constant);
            }
            if (config.use === uses.request) {
                return $http.get(config.request);
            }
        };

        $q.when(getUser())
            .then(function (response) {
                OsdAuthUser.setUser(response);

                $rootScope.$broadcast('osdauth-user-loaded');
            });
    }

    angular.module('osdAuth')
        .run(run);

}());

(function () {

    'use strict';

    function OsdAuth($q, $http, $rootScope, OsdAuthConfig, OsdAuthUser) {
        var self = {};

        self.login = function (credentials) {
            return $q.when($http.post(OsdAuthConfig.config.login, credentials))
                .then(
                    function loginSuccess(response) {
                        $rootScope.$broadcast('osdauth-login-success');

                        return OsdAuthUser.setUser(response.data).getUser();
                    },
                    function loginError(error) {
                        $rootScope.$broadcast('osdauth-login-error', error.data);

                        throw error;
                    }
                );
        };

        self.logout = function () {
            return $q.when($http.post(OsdAuthConfig.config.logout))
                .then(
                    function logoutSuccess() {
                        $rootScope.$broadcast('osdauth-logout-success');

                        return OsdAuthUser.setUser(null).getUser();
                    },
                    function logoutError(error) {
                        $rootScope.$broadcast('osdauth-logout-error', error.data);

                        throw error;
                    }
                );
        };

        self.register = function (data) {
            return $q.when($http.post(OsdAuthConfig.config.register, data))
                .then(
                    function registerSuccess(response) {
                        $rootScope.$broadcast('osdauth-register-success');

                        return OsdAuthUser.setUser(response.data).getUser();
                    },
                    function registerError(error) {
                        $rootScope.$broadcast('osdauth-register-error', error.data);

                        throw error;
                    }
                );
        };

        return self;
    }

    angular.module('osdAuth')
        .service('OsdAuth', OsdAuth);

}());

(function () {

    'use strict';

    function OsdAuthUser($rootScope, OsdAuthConfig) {
        var self = {};

        self.user = null;
        self.groups = null;

        function initGroups() {
            if (self.user && self.user.groups) {
                self.groups = self.user.groups.map(function (group) {
                    return group[OsdAuthConfig.config.groupKey];
                });
            }
        }

        self.getUser = function () {
            return self.user;
        };

        self.setUser = function (user) {
            self.user = user;

            initGroups();

            $rootScope.$broadcast('osdauth-user-updated');

            return self;
        };

        self.getGroups = function () {
            return self.groups || ['guest'];
        };

        self.isAuthenticated = function () {
            return !!self.user;
        };

        self.isAuthorized = function (neededGroups) {
            if (!angular.isArray(neededGroups)) {
                neededGroups = [neededGroups];
            }

            if (!self.isAuthenticated() && neededGroups.indexOf('guest') === -1) {
                return false;
            }

            // We grad the current users's groups
            var currentGroups = self.getGroups();

            // If the user is admin, he has access to everything.
            if (currentGroups.indexOf('admin') !== -1) {
                return true;
            }

            // We filter the list of needed groups and return only the ones that the current user has
            var hasGroups = neededGroups.filter(function (role) {
                return currentGroups.indexOf(role) !== -1;
            });

            // The user is authorized only if he has at least one group needed.
            return !neededGroups.length || !!hasGroups.length;
        };

        return self;
    }

    angular.module('osdAuth')
        .service('OsdAuthUser', OsdAuthUser);

}());
