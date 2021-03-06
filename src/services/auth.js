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
