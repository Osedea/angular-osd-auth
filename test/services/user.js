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
    }));

    beforeEach(function () {
        user = CURRENT_USER;

        $rootScope.$digest();
    });

    it('should return to logged in user', function () {
        expect(OsdAuthUser.getUser()).toBe(user);
    });

    it('should fire event when setting user', function () {
        OsdAuthUser.setUser(null);

        expect(OsdAuthUser.getUser()).toBe(null);
        expect($rootScope.$broadcast).toHaveBeenCalledWith('osdauth-user-updated');
    });

    it('should report authenticated state', function () {
        expect(OsdAuthUser.getUser()).toBe(user);
        expect(OsdAuthUser.isAuthenticated()).toBe(true);

        OsdAuthUser.setUser(null);

        expect(OsdAuthUser.getUser()).toBe(null);
        expect(OsdAuthUser.isAuthenticated()).toBe(false);
    });

    it('should output groups using key defined in config', function () {
        var userGroups = user.groups.map(function (group) {
            return group[OsdAuthConfig.config.groupKey];
        });

        expect(OsdAuthUser.getGroups()).toEqual(userGroups);
    });

    it('should check if the admin has access to anything', function () {
        expect(OsdAuthUser.isAuthorized()).toBe(true);
        expect(OsdAuthUser.isAuthorized('guest')).toBe(true);
        expect(OsdAuthUser.isAuthorized('admin')).toBe(true);
        expect(OsdAuthUser.isAuthorized('asdfasd')).toBe(true);
        expect(OsdAuthUser.isAuthorized(['asdasd', 'asdfasd'])).toBe(true);
    });

    it('should check if a user with no groups has access to things', function () {
        var temp = angular.copy(user);
        temp.groups = [];

        OsdAuthUser.setUser(temp);

        $rootScope.$digest();

        expect(OsdAuthUser.isAuthorized()).toBe(false);
        expect(OsdAuthUser.isAuthorized('guest')).toBe(false);
        expect(OsdAuthUser.isAuthorized('admin')).toBe(false);
        expect(OsdAuthUser.isAuthorized('asdfasd')).toBe(false);
        expect(OsdAuthUser.isAuthorized(['asdasd', 'asdfasd'])).toBe(false);
    });

    it('should check if a guest has access to things', function () {
        OsdAuthUser.setUser(null);

        $rootScope.$digest();

        expect(OsdAuthUser.isAuthorized()).toBe(false);
        expect(OsdAuthUser.isAuthorized('guest')).toBe(true);
        expect(OsdAuthUser.isAuthorized('admin')).toBe(false);
        expect(OsdAuthUser.isAuthorized('asdfasd')).toBe(false);
        expect(OsdAuthUser.isAuthorized(['asdasd', 'asdfasd'])).toBe(false);
    });
});
