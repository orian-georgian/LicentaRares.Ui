(function (angular) {

	'use strict';

	angular.module('newProjectApp')
		.controller('MembersCtrl', ['$scope', 'DataProvider', function ($scope, data) {

			function initialize() {
				data.members().then(function(members) {
					$scope.members = members;
				});
			}

			initialize();

		}]);

}).call(this, this.angular);
