(function (angular) {

	'use strict';

	angular.module('newProjectApp')
		.controller('TeachingCtrl', ['$scope', 'DataProvider', function ($scope, data) {

			function getLecturesByYear(members) {
				var allLectures = [];

				_.each(members, function(member) {
					if (member.lectures.length > 0) {
						_.each(member.lectures, function(lecture) {
							allLectures.push({
								memberName: member.name,
								memberEmail: member.email,
								l: lecture
							});
						});
					}
				});
				return _.uniq(allLectures).reverse();
			}

			function initialize() {
				data.members().then(function (members) {
					var lectures = getLecturesByYear(members);
					$scope.yearGroups = _.groupBy(lectures, 'l.year');
				});
			}

			initialize();

		}]);

}).call(this, this.angular);