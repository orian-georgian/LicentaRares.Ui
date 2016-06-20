(function (angular, u, _) {

	'use strict';

	var Member = u.Member,
		Lecture = u.Lecture,
		Project = u.Project,
		Publication = u.Publication;

	angular.module('newProjectApp')
		.service('mappers', function() {

			function mapLectures(dto) {
				return _.map(dto, function(l) {
					var lecture = new Lecture();
					lecture.id = l.Id;
					lecture.name = l.Name;
					lecture.line = l.Line;
					lecture.laboratory = l.Laboratory;
					lecture.year = l.Year;
					lecture.teacher = l.Teacher;
					return lecture;
				});
			}

			function mapProjects(dto) {
				return _.map(dto, function(p) {
					var project = new Project();
					project.id = p.Id;
					project.title = p.Title;
					project.description = p.Description;
					project.startDate = p.StartDate;
					project.endDate = p.EndDate;
					project.coordinators = p.Coordinators;
					return project;
				});
			}

			function mapPublications(dto) {
				return _.map(dto, function(p) {
					var publication = new Publication();
					publication.id = p.Id;
					publication.title = p.Title;
					publication.description = p.Description;
					publication.publicationDate = p.PublicationDate;
					publication.authors = p.Authors;
					return publication;
				});
			}

			function mapMembers(dto) {
				return _.map(dto, function(m) {
					var member = new Member();
					member.id = m.Id;
					member.name = m.FullName;
					member.role = m.Role;
					member.memberFunction = m.MemberFunction;
					member.personalPage = m.PersonalPage;
					member.email = m.Email;
					member.lectures = mapLectures(m.Lectures);
					member.projects = mapProjects(m.Projects);
					member.publications = mapPublications(m.Publications);
					return member;
				});
			}

			function mapMember(m) {
				var member = new Member();
				member.id = m.Id;
				member.name = m.FullName;
				member.role = m.Role;
				member.memberFunction = m.MemberFunction;
				member.personalPage = m.PersonalPage;
				member.email = m.Email;
				member.lectures = mapLectures(m.Lectures);
				member.projects = mapProjects(m.Projects);
				member.publications = mapPublications(m.Publications);
				return member;
			}

			function unmapProjects(dto) {
				return _.map(dto, function(p) {
					return {
						Id: p.id,
						Title: p.title,
						Description: p.description,
						StartDate: p.startDate,
						EndDate: p.endDate,
						Coordinators: []
					};
				});
			}

			function unmapLectures(dto, memberId) {
				return _.map(dto, function(l) {
					return _.isNull(l.id) ? {
						Name: l.name,
						Line: l.line,
						Laboratory: l.laboratory,
						Year: l.year,
						Teacher: {
							Id: memberId
						} 
					} : {
						Id: l.id,
						Name: l.name,
						Line: l.line,
						Laboratory: l.laboratory,
						Year: l.year,
						Teacher: {
							Id: memberId
						}
					};
				});
			}

			function unmapPublications(dto) {
				return _.map(dto, function(p) {
					return {
						Id: p.id,
						Title: p.title,
						Description: p.description,
						PublicationDate: p.publicationDate,
						Authors : []
					};
				});
			}

			function unmapMember(member) {
				return {
					Id: member.id ? member.id : 0,
					FullName: member.name,
					Role: member.role,
					PersonalPage: member.personalPage,
					MemberFunction: member.memberFunction,
					Email: member.email,
					Projects: unmapProjects(member.projects),
					Lectures: unmapLectures(member.lectures, member.id),
					Publications: unmapPublications(member.publications)
				};
			}

			this.mapMembers = mapMembers;
			this.mapMember = mapMember;
			this.unmapMember = unmapMember;

		});

}).call(this, this.angular, this.Model.University, this._);