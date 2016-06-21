(function (angular, _) {

	'use strict';

	angular.module('newProjectApp')
		.controller('ProjectsCtrl', ['$scope', 'DataProvider', function ($scope, data) {

			function getAllProjects(members) {
				var allProjects = [];
				_.each(members, function(member) {
					if (member.projects.length > 0) {
						_.each(member.projects, function(project) {
							allProjects.push({
								memberName: member.name,
								memberEmail: member.email,
								project: project
							});
						});
					}
				});
				return _.uniq(allProjects);
			}

			function initialize() {
				data.members().then(function(members) {
					$scope.projects = getAllProjects(members);
				});
			}

			initialize();

		}]);	

}).call(this, this.angular, this._);