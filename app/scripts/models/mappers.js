(function (angular, u, _, moment) {

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
					lecture.teachers = l.Teachers;
					return lecture;
				});
			}

			function mapProjects(dto) {
				return _.map(dto, function(p) {
					var project = new Project();
					project.id = p.Id;
					project.title = p.Title;
					project.description = p.Description;
					project.startDate = moment(p.StartDate).valueOf();
					project.endDate = moment(p.EndDate).valueOf();
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
					publication.publicationDate = moment(p.PublicationDate).valueOf();
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
					member.memberPhoto = m.MemberPhoto;
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
						Id: p.id ? p.id : 0,
						Title: p.title,
						Description: p.description,
						StartDate: moment(p.startDate).format('MM-DD-YYYY'),
						EndDate: moment(p.endDate).format('MM-DD-YYYY'),
						Coordinators: []
					};
				});
			}

			function unmapLectures(dto, memberId) {
				return _.map(dto, function(l) {
					return {
						Id: l.id ? l.id : 0,
						Name: l.name,
						Line: l.line,
						Laboratory: l.laboratory,
						Year: l.year,
						Teachers: []
					};
				});
			}

			function unmapPublications(dto) {
				return _.map(dto, function(p) {
					return {
						Id: p.id ? p.id : 0,
						Title: p.title,
						Description: p.description,
						PublicationDate: moment(p.publicationDate).format('MM-DD-YYYY'),
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
					MemberPhoto: member.memberPhoto,
					Projects: unmapProjects(member.projects),
					Lectures: unmapLectures(member.lectures, member.id),
					Publications: unmapPublications(member.publications)
				};
			}

			this.mapMembers = mapMembers;
			this.mapMember = mapMember;
			this.unmapMember = unmapMember;

		});

}).call(this, this.angular, this.Model.University, this._, this.moment);