(function (angular, $, moment) {

    'use strict';

    /**
    * @ngdoc overview
    * @name newProjectApp
    * @description
    * # newProjectApp
    *
    * Main module of the application.
    */
    angular
        .module('newProjectApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.bootstrap',
            'ui.bootstrap.tpls',
            'angularFileUpload'
        ])
        .value('apiUrl', this.apiUrl || 'http://localhost:52447')
        .factory('httpInterceptor', function ($q, $rootScope, $log) {

            var numLoadings = 0;

            return {
                request: function (config) {

                    numLoadings++;

                    // Show loader
                    $rootScope.$broadcast("loader_show");
                    return config || $q.when(config)

                },
                response: function (response) {

                    if ((--numLoadings) === 0) {
                        // Hide loader
                        $rootScope.$broadcast("loader_hide");
                    }

                    return response || $q.when(response);

                },
                responseError: function (response) {

                    if (!(--numLoadings)) {
                        // Hide loader
                        $rootScope.$broadcast("loader_hide");
                    }

                    return $q.reject(response);
                }
            };
        })
        .config(function ($routeProvider, $httpProvider) {
            $httpProvider.interceptors.push('httpInterceptor');
            $routeProvider
            .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl'
                })
                .when('/projects', {
                    templateUrl: 'views/projects.html',
                    controller: 'ProjectsCtrl'
                })
                .when('/publications', {
                    templateUrl: 'views/publications.html',
                    controller: 'PublicationsCtrl'
                })
                .when('/teaching', {
                    templateUrl: 'views/teaching.html',
                    controller: 'TeachingCtrl'
                })
                .when('/members', {
                    templateUrl: 'views/members.html',
                    controller: 'MembersCtrl'
                })
                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    controller: 'ContactCtrl'
                })
                .when('/administrator', {
                    templateUrl: 'views/administrator.html',
                    controller: 'AdministratorCtrl'
                })
                .when('/profile/:email', {
                    templateUrl: 'views/profile.html',
                    controller: 'ProfileCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
        .directive('fallbackSrc', function () {
            var fallbackSrc = {
                link: function postLink(scope, iElement, iAttrs) {
                    iElement.bind('error', function() {
                        angular.element(this).attr("src", iAttrs.fallbackSrc);
                    });
                }
            }
            return fallbackSrc;
        })
        .directive("loader", function ($rootScope) {
            return function ($scope, element, attrs) {
                $scope.$on("loader_show", function () {
                    return element.show();
                });
                return $scope.$on("loader_hide", function () {
                    return element.hide();
                });
            };
        })
        .directive('scrollTop', function() {
            return {
                restrict: 'A',
                link: function(scope, element) {
                    $('.arrow-up').click(function() {
                        $('html body').scrollTop(0);
                    });
                }
            };
        })
        .filter('dateFormat', function() {
            return function(input) {
                return moment(input).format('MM/DD/YYYY');
            };
        });

}).call(this, this.angular, this.jQuery, this.moment);
