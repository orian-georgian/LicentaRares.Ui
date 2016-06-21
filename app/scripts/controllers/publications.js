(function (angular, _, moment) {

	'use strict';

	angular.module('newProjectApp')
		.controller('PublicationsCtrl', ['$scope', 'DataProvider', function ($scope, data) {

			function getPublications(members) {
				var allPublications = [];

				_.each(members, function(member) {
					if (member.publications.length > 0) {
						_.each(member.publications, function(publication) {
							publication.publicationDate = moment(publication.publicationDate).year();
							allPublications.push({
								memberName: member.name,
								memberEmail: member.email,
								p: publication
							});
						});
					}
				});
				return _.uniq(allPublications);
			}

			function initialize() {
				data.members().then(function(members) {
					var publications = getPublications(members);
					$scope.yearGroups = _.groupBy(publications, 'p.publicationDate');
				});
			}

			initialize();;

		}]);

}).call(this, this.angular, this._, this.moment);
