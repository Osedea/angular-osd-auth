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
