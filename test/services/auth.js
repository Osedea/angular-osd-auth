describe('osdAuth', function () {
    var user, $http, $rootScope, OsdAuth, OsdAuthUser, OsdAuthConfig, CURRENT_USER;

    beforeEach(module('osdAuth'));

    beforeEach(inject(function (_$http_, $q, _$rootScope_, _OsdAuth_, _OsdAuthUser_, _OsdAuthConfig_, _CURRENT_USER_) {
        OsdAuth = _OsdAuth_;
        OsdAuthUser = _OsdAuthUser_;
        OsdAuthConfig = _OsdAuthConfig_;
        CURRENT_USER = _CURRENT_USER_;

        // Mock the $rootScope to catch events
        $rootScope = _$rootScope_;
        spyOn($rootScope, '$broadcast');

        // Mock the $http
        $http = _$http_;
        spyOn(_$http_, 'post').and.callFake(function (url, data) {
            var defer = $q.defer();

            if (url === OsdAuthConfig.config.login) {
                defer.resolve(user);
            } else if (url === OsdAuthConfig.config.logout) {
                defer.resolve();
            } else if (url === OsdAuthConfig.config.register) {
                defer.resolve(user);
            }

            return defer.promise;
        });
    }));

    beforeEach(function () {
        user = CURRENT_USER;
    });

    it('should login', function () {
        var promise = OsdAuth.login({email: 'admin@osedea.com', password: '123'});

        expect($http.post).toHaveBeenCalled();

        $rootScope.$digest();

        expect($rootScope.$broadcast).toHaveBeenCalledWith('osdauth-login-success');
        expect($rootScope.$broadcast).toHaveBeenCalledWith('osdauth-user-updated');

        promise.then(function (response) {
            expect(response).toBe(user);
        });
    });

    it('should logout', function () {
        var promise = OsdAuth.logout();

        expect($http.post).toHaveBeenCalled();

        $rootScope.$digest();

        expect($rootScope.$broadcast).toHaveBeenCalledWith('osdauth-logout-success');
        expect($rootScope.$broadcast).toHaveBeenCalledWith('osdauth-user-updated');

        promise.then(function (response) {
            expect(response).toBe(null);
        });
    });
});
