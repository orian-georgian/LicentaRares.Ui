(function (angular) {

	'use strict';

	angular.module('newProjectApp')
		.service('DataProvider', ['$http', '$q', 'apiUrl', 'mappers', function($http, $q, apiUrl, map) {

			this.sendContact = function(contact) {
				var deffered = $q.defer();
				$http.post(apiUrl + '/contact', contact)
					.success(function (data){
						deffered.resolve(null);
					})
					.error(function(error) {
						deffered.reject(null);
					});
				return deffered.promise;
			};

			this.members = function() {
				var deffered = $q.defer();
				$http.get(apiUrl + '/member/all')
					.success(function (data){
						deffered.resolve(map.mapMembers(data));
					})
					.error(function(error) {
						deffered.reject(error);
					});
				return deffered.promise;
			};

			this.save = function(member) {
				var deffered = $q.defer();
				$http.post(apiUrl + '/member/new', map.unmapMember(member))
					.success(function (data){
						deffered.resolve(data);
					})
					.error(function(error) {
						deffered.reject(error);
					});
				return deffered.promise;
			};

			this.update = function(member) {
				var deffered = $q.defer();
				$http.post(apiUrl + '/member/update', map.unmapMember(member))
					.success(function (data){
						deffered.resolve(data);
					})
					.error(function(error) {
						deffered.reject(error);
					});
				return deffered.promise;
			};

			this.zap = function(member) {
				var deffered = $q.defer();
				$http.post(apiUrl + '/member/delete', map.unmapMember(member))
					.success(function (data){
						deffered.resolve(data);
					})
					.error(function(error) {
						deffered.reject(error);
					});
				return deffered.promise;
			};

			this.member = function(email) {
				var deffered = $q.defer();
				$http.get(apiUrl + '/member?Email=' + email)
					.success(function (data){
						deffered.resolve(map.mapMember(data));
					})
					.error(function(error) {
						deffered.reject(error);
					});
				return deffered.promise;
			};

		}]);

}).call(this, this.angular);