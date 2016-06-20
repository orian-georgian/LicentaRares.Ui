(function (angular, $, box) {

	'use strict';

	angular.module('newProjectApp')
		.directive('navbarHeader', ['$rootScope', '$location', 'auth', 'localStore', function(root, $l, auth, store) {

			return {
				restrict: 'A',
				replace: true,
				templateUrl: 'views/templates/header.tmpl.html',
				link: function (scope) {

					function changeRoute() {
						if (!store.get('Token') && $l.path() === '/administrator') {
							$l.path('/');
						}
					}

					scope.$on('$routeChangeStart', function(next, current) {
						changeRoute();
					});

					scope.email = '';
					scope.password = '';
					scope.isLogged = false;

					scope.isActive = function(path) {
						return $l.path() === path;
					};

					scope.areNotTheSame = function() {
						return scope.newPass !== scope.confPass;
					};

					root.canSee = function(memberEmail) {
						if (!scope.user) { return; }
						return scope.user.Email === memberEmail || scope.user.AuthRole === 'admin';
					};

					scope.login = function() {
						auth.authenticate(scope.email, scope.password).then(function (data) {
							scope.isLogged = true;
							scope.user = data;
							scope.email = '';
							scope.password = '';
							$l.path('/');
						});
					};

					scope.changePassword = function() {
						auth.change(scope.email, scope.newPass).then(function(){
							box.success('Password has been changed!');
							$l.path('/');
						}, function() {
							box.error('Some problems with password change. Please try again!');
						})
					};

					scope.logout = function() {
						auth.logout().then(function() {
							scope.isLogged = false;
							scope.user = null;
							changeRoute();
						});
					};

					auth.authenticate().then(function (data) {
						scope.isLogged = true;
						scope.user = data;
					});

					changeRoute();
				}
			};

		}])
		.directive('onFocus', ['$timeout', function($t) {
			return {
				restrict: 'A',
				link: function(scope, element) {
					$t(function() {
						element[0].focus();
					}, 0);
				}
			};
		}]);

}).call(this, this.angular, this.jQuery, this.toastr);