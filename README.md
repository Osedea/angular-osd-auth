# angular-osd-auth

This module provides an easy way to authenticate users using $http service in angular.

### Version
0.1.0

### Installation and Setup

This package can be installed using bower:
```sh
$ bower install angular-osd-auth
```

Add the module to your app's module list:

```js
angular.module(
            'app',
            [
                ...,
                'osdAuth',
            ]
    )
```

Include a script tag (or add it to whatever you use to compile your js):
```html
<script src="path/to/bower_components/angular-osd-auth/angular-osd-auth.min.js"></script>
```

### Configuration

URL default to:
* *Login* **POST** /api/v1/auth/login
* *Logout* **POST** /api/v1/auth/logout
* *Register* **POST** /api/v1/auth/register

You can change each url using the config provider:

```js
(function() {

    // @ngInject
    function authConfig(OsdAuthConfigProvider) {
        OsdAuthConfigProvider
            .setLogin('/your/custom/login/url')
            .setLogout('/your/custom/logout/url')
            .setRegister('/your/custom/register/url');
    }

    app.config(authConfig);
})();
```

Also, this library assumes that you are injecting a constant from your backend to angular for the current logged in user. The constant is assumed to be named *CURRENT_USER*. You can change the name of the constant or simply use a request to query the current logged in user.

```js
(function() {

    // @ngInject
    function authConfig(OsdAuthConfigProvider) {
        OsdAuthConfigProvider
            .setConstant('OTHER_CONSTANT_NAME')
            .setRequest('/your/custom/request/url');
    }

    app.config(authConfig);
})();
```

### How to Use

#### OsdAuth

This service exposes these methods

```js
OsdAuth.login(credentials) // Login a user
OsdAuth.logout()           // Logout the current user
OsdAuth.register(data)     // Register a user
```

You can use it this way:

```js
(function() {

    // @ngInject
    function MyController($scope, OsdAuth) {
        OsdAuth.login({email: 'some@email.com', password: 'somepassword'})
            .then(function (response) {
                // Do something with the response
            })
            .catch(function (error) {
                // Do something with the error
            });

        $scope.$on('osdauth-login-success', function () {
            // Login was successful
        });

        $scope.$on('osdauth-login-error', function () {
            // Login was not successful
        });

        $scope.$on('osdauth-user-updated', function () {
            // User was updated
        });
    }

    app.controller('MyController', MyController);
})();
```

#### OsdAuthUser

```js
OsdAuthUser.getUser()               // Returns the current logged in user
OsdAuthUser.setUser(newUser)        // New user data
OsdAuthUser.isAuthenticated()       // Whether or not a user is set
OsdAuthUser.isAuthorized(resources) // Whether or not a user is authorized for a resource
```

```js
(function() {

    // @ngInject
    function MyController($scope, OsdAuthUser) {
        var currentUser = OsdAuthUser.getUser();

        $scope.isAuthorized = function () {
            return OsdAuthUser.isAuthorized();
        };
    }

    app.controller('MyController', MyController);
})();
```

### License

The MIT License (MIT)

Copyright (c) 2015 damacisaac

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
