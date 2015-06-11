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
