(function() {

	'use strict';

	function Lecture() {
		this.id = null;
		this.name = null;
		this.line = null;
		this.laboratory = null;
		this.year = null;
		this.teachers = [];
	}

	function Project() {
		this.id = null;
		this.title = null;
		this.description = null;
		this.startDate = null;
		this.endDate = null;
		this.coordinators = [];
	}

	function Publication() {
		this.id = null;
		this.title = null;
		this.description = null;
		this.publicationDate = null;
		this.authors = [];
	}

	function Member() {
		this.id = null;
		this.name = null;
		this.personalPage = null;
		this.memberFunction = null;
		this.role = null;
		this.email = null;
		this.memberPhoto = null;
		this.projects = [];
		this.lectures = [];
		this.publications = [];
	}

	this.Model = this.Model || {};
	this.Model.University = this.Model.University || {};
	this.Model.University.Member = Member;
	this.Model.University.Lecture = Lecture;
	this.Model.University.Project = Project;
	this.Model.University.Publication = Publication;

}).call(this);