(function (ng) {

    'use strict';

    var authHeaders = {
        'X-User-Token': null,
    };

    function LoginModel(email, password) {
        this.Email = email || null;
        this.Password = password || null;
    }

    function clearHeaders() {
        authHeaders['X-User-Token'] = null;
    }

    function AuthenticationService($http, $q, apiUrl, store) {

        var authPath = apiUrl + '/login';

        function authenticateByCredentials(email, password) {
            var deff = $q.defer();

            $http.post(authPath, new LoginModel(email, password))
                .then(function (response) {
                    authHeaders['X-User-Token'] = response.data.AuthToken;
                    store.set('Token', response.data.AuthToken);
                    deff.resolve(response.data);
                }, deff.reject);

            return deff.promise;
        }

        function authenticateByCurrentToken() {
            var deff = $q.defer(),
                token = store.get('Token');

            if (!token) {
                deff.reject('There is no current token');
                return deff.promise;
            }

            authHeaders['X-User-Token'] = token;

            $http.get(authPath).then(function (response) {
                deff.resolve(response.data);
            }, deff.reject);

            return deff.promise;
        }

        this.authenticate = function (email, password) {
            if (!email) {
                return authenticateByCurrentToken();
            }

            return authenticateByCredentials(email, password);
        };

        this.change = function(email, password) {
            var deff = $q.defer();

            $http.post(apiUrl + '/password/change', new LoginModel(email, password))
                .then(function (response) {
                    deff.resolve(response);
                }, deff.reject);

            return deff.promise;
        };

        this.logout = function () {
            var deff = $q.defer();

            $http.post(apiUrl + '/logout/')
                .then(function(response) {
                    deff.resolve(null);
                    store.zap('Token');
                    clearHeaders();
                }, deff.reject);

            return deff.promise;
        };

    }

    ng.module('newProjectApp')
        .service('tokenInterceptor', ['$q', function ($q) {
            this.responseError = function (rejection) {
                if (rejection.status === 403) {
                    clearHeaders();
                }
                return $q.reject(rejection);
            };
        }])
		.provider('auth', ['$httpProvider', function ($httpProvider) {

		    $httpProvider.defaults.headers.common = authHeaders;
		    $httpProvider.interceptors.push('tokenInterceptor');

		    this.$get = ['$http', '$q', 'apiUrl', 'localStore', function ($http, $q, apiUrl, store) {
		        return new AuthenticationService($http, $q, apiUrl, store);
		    }];

		}]);

}).call(this, this.angular);