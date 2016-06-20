(function (angular, success, error) {

	'use strict';

	function Contact(name, email, message) {
		this.Name = name || null;
		this.Email = email || null;
		this.Message = message || null;
	}

	angular.module('newProjectApp')
		.controller('ContactCtrl',['$scope', 'DataProvider', function ($scope, data) {

			function clear() {
				$scope.name = null;
				$scope.email = null;
				$scope.message = null;
			}

			$scope.reset = function() {
				clear();
			};

			$scope.sendMessage = function() {
				data.sendContact(new Contact($scope.name, $scope.email, $scope.message)).then(function() {
					success('Contact mail sent!');
					clear();
				}, function() {
					error('Mail not sent. Please try again later!');
				});
			};

		}]);


}).call(this, this.angular, this.toastr.success, this.toastr.error);