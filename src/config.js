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
