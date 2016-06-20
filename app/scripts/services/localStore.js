(function (angular) {

	'use strict';

	angular.module('newProjectApp')
		.service('localStore', ['$window', function($window) {

			var w = $window;

			this.set = function(key, value) {
				if (angular.isFunction(w.localStorage.setItem)) {
					w.localStorage.setItem(key, angular.toJson(value));
					return;
				}
				w.localStorage[key] = angular.toJson(value);
			};

			this.get = function(key) {
				if (angular.isFunction(w.localStorage.getItem)) {
					return angular.fromJson(w.localStorage.getItem(key));
				}
				return angular.fromJson(w.localStorage[key]);
			};

			this.zap = function(key) {
				if (angular.isFunction(w.localStorage.removeItem)) {
					w.localStorage.removeItem(key);
					return;
				}
				delete w.localStorage[key];
			};

		}]);

}).call(this, this.angular);