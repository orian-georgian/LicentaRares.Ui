(function (angular, _, box) {

	'use strict';

	angular.module('newProjectApp')
		.controller('ProfileCtrl', ['$scope', '$routeParams', 'DataProvider', 'Upload', function($scope, params, data, Upload) {

			var clone = null;

			function initialize() {
				data.members().then(function(members) {					
					$scope.member = _.find(members, { email : params.email });
				});
			}

			$scope.infoEditMode = false;
			$scope.lectureEditMode = false;

			$scope.upload = function (file) {
				Upload.upload({
					url: 'upload/url',
					data: { file: file }
				}).then(function (resp) {
					console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
				}, function (resp) {
					console.log('Error status: ' + resp.status);
				}, function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
				});
			};

			$scope.editInfo = function() {
				clone = _.clone($scope.member);
				$scope.infoEditMode = true;
			};

			$scope.editLecture = function(lecture) {
				$scope.lecture = lecture;
				$scope.lectureEditMode = true;
			};

			$scope.saveInfo = function() {
				data.update($scope.member).then(function() {
					box.success('Member information was saved!');
					$scope.infoEditMode = false;
				});
			};

			$scope.saveLecture = function() {
				if (!$scope.lecture.id) {
					$scope.member.lectures.push({
						id: null,
						name: $scope.lecture.name,
						line: $scope.lecture.line,
						laboratory: $scope.lecture.laboratory,
						year: $scope.lecture.year
					});
				}
				data.update($scope.member).then(function() {
					box.success('Lecture saved!');
					$scope.lectureEditMode = false;
					initialize();
				});
			};

			$scope.cancelLecture = function() {
				$scope.lectureEditMode = false;
			};

			$scope.zapLecture = function(lecture) {
				if (!confirm('Are you sure you want te remove this lecture?')) {
					return;
				}
				$scope.member.lectures = _.without($scope.member.lectures, lecture);
				data.update($scope.member).then(function() {
					box.success('Lecture removed!');
				});
			};

			$scope.cancelUpdateInfo = function() {
				if (!_.isEqual(clone, $scope.member)) {
					if (!confirm('Your changes will be lost. Are you sure?')) {
						return;
					}
					$scope.member = clone;
				}
				$scope.infoEditMode = false;
			};

			$scope.isFormDirty = function() {
				return $scope.myform.$invalid || !$scope.myform.$dirty;
			};

			initialize();

		}]);

}).call(this, this.angular, this._, this.toastr);