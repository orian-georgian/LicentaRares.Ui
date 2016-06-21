(function (angular, _, box) {

	'use strict';

	angular.module('newProjectApp')
		.controller('ProfileCtrl', ['$scope', '$routeParams', 'DataProvider', 'FileUploader', 'apiUrl', 'localStore', '$route', '$location', function($scope, params, data, FileUploader, apiUrl, store, $route,$l) {

			var clone = null,
				lclone = null,
				prjclone = null,
				pubclone = null;

			function initialize() {
				data.members().then(function(members) {					
					$scope.member = _.find(members, { email : params.email });
					if (!$scope.member) {
						$l.path('/');
						return;
					}
					$scope.uploadButtonName = $scope.member.memberPhoto ? 'Change picture' : 'Upload picture';
				});
			}

			$scope.format = 'MM /dd /yyyy';
			$scope.infoEditMode = false;
			$scope.lectureEditMode = false;
			$scope.projectEditMode = false;
			$scope.publicationEditMode = false;
			$scope.years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
			$scope.lines = ['Roumanian', 'English', 'German', 'Hungarian'];
			$scope.uploader = new FileUploader({
				url: apiUrl + '/member/photo',
				method: 'POST',
				headers: {
					'X-User-Token': store.get('Token')
				}
			});
			
			$scope.uploader.onSuccessItem = function(fileItem, response, status, headers) {
	            initialize();
	            $scope.uploader.queue = [];
	        };

			$scope.editInfo = function() {
				clone = _.cloneDeep($scope.member);
				$scope.infoEditMode = true;
			};

			$scope.editLecture = function(lecture) {
				lclone = _.cloneDeep($scope.member);
				$scope.lecture = lecture;
				$scope.lectureEditMode = true;
			};

			$scope.editProject = function(project) {
				prjclone = _.cloneDeep($scope.member);
				$scope.project = project;
				$scope.projectEditMode = true;
			};

			$scope.editPublication = function(publication) {
				pubclone = _.cloneDeep($scope.member);
				$scope.publication = publication;
				$scope.publicationEditMode = true;
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

			$scope.saveProject = function() {
				if (!$scope.project.id) {
					$scope.member.projects.push({
						id: null,
						title: $scope.project.title,
						description: $scope.project.description,
						startDate: $scope.project.startDate,
						endDate: $scope.project.endDate
					});
				}
				data.update($scope.member).then(function() {
					box.success('Project saved!');
					$scope.projectEditMode = false;
					initialize();
				});
			};

			$scope.savePublication = function() {
				if (!$scope.publication.id) {
					$scope.member.publications.push({
						id: null,
						title: $scope.publication.title,
						description: $scope.publication.description,
						publicationDate: $scope.publication.publicationDate
					});
				}
				data.update($scope.member).then(function() {
					box.success('Publication saved!');
					$scope.publicationEditMode = false;
					initialize();
				});
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

			$scope.zapProject = function(project) {
				if (!confirm('Are you sure you want te remove this project?')) {
					return;
				}
				$scope.member.projects = _.without($scope.member.projects, project);
				data.update($scope.member).then(function() {
					box.success('Project removed!');
				});
			};

			$scope.zapPublication = function(publication) {
				if (!confirm('Are you sure you want te remove this publication?')) {
					return;
				}
				$scope.member.publications = _.without($scope.member.publications, publication);
				data.update($scope.member).then(function() {
					box.success('Publication removed!');
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

			$scope.cancelLecture = function() {
				if (!_.isEqual(lclone, $scope.member)) {
					if (!confirm('Your changes will be lost. Are you sure?')) {
						return;
					}
					$scope.member = lclone;
				}
				$scope.lectureEditMode = false;
			};

			$scope.cancelProject = function() {
				if (!_.isEqual(prjclone, $scope.member)) {
					if (!confirm('Your changes will be lost. Are you sure?')) {
						return;
					}
					$scope.member = prjclone;
				}
				$scope.projectEditMode = false;
			};

			$scope.cancelPublication = function() {
				if (!_.isEqual(pubclone, $scope.member)) {
					if (!confirm('Your changes will be lost. Are you sure?')) {
						return;
					}
					$scope.member = pubclone;
				}
				$scope.publicationEditMode = false;
			};

			$scope.isFormDirty = function() {
				return $scope.myform.$invalid || !$scope.myform.$dirty;
			};
			$scope.isLctFormDirty = function() {
				return $scope.lform.$invalid || !$scope.lform.$dirty || !$scope.lecture.year || !$scope.lecture.line;
			};
			$scope.isPrjFormDirty = function() {
				return $scope.pjform.$invalid || !$scope.pjform.$dirty;
			};
			$scope.isPubFormDirty = function() {
				return $scope.pubform.$invalid || !$scope.pubform.$dirty;
			};

			$scope.popup1 = {
				opened: false
			};

			$scope.popup2 = {
				opened: false
			};

			$scope.popup3 = {
				opened: false
			};

			$scope.open1 = function() {
				$scope.popup1.opened = true;
			};

			$scope.open2 = function() {
				$scope.popup2.opened = true;
			};

			$scope.open3 = function() {
				$scope.popup3.opened = true;
			};

			initialize();

		}]);

}).call(this, this.angular, this._, this.toastr);