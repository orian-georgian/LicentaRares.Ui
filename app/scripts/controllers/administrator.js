(function (angular, success, _) {

	'use strict';

	angular.module('newProjectApp')
		.controller('AdministratorCtrl', ['$scope', 'DataProvider', function ($scope, data) {

			function initialize() {
				data.members().then(function (members) {
					$scope.members = members;
				});
			}

			function clear() {
				$scope.member.name = null;
				$scope.member.role = null;
				$scope.member.memberFunction = null;
				$scope.member.personalPage = null;
				$scope.member.email = null;
				$scope.isEditMode = false;
			}

			$scope.isEditMode = false;

			$scope.add = function() {
				$scope.member = {
					name: null,
					role: null,
					personalPage: null,
					memberFunction: null,
					email: null
				};
				$scope.isEditMode = true;
			};

			$scope.save = function () {
				data.save($scope.member).then(function () {
					success('New member added!');
					clear();
					initialize();
				});
			};

			$scope.edit = function(member) {
				$scope.member = member;
				$scope.isEditMode = true;
			};

			$scope.zap = function (member) {
				if (!confirm('Are you sure you wanna delete previous member?')) {
					return;
				}
				data.zap(member).then(function() {
					$scope.members = _.without($scope.members, member);
					success('Member removed!');
				});
			};

			$scope.notMemberFound = function() {
				return _.isUndefined($scope.filter) ? false : !Boolean(_.find($scope.members, function(m) {
					return m.name.indexOf($scope.filter.name) > -1;
				}));
			}

			$scope.reset = function() {
				clear();
			};

			initialize();

		}]);

}).call(this, this.angular, this.toastr.success, this._);