'use strict';

angular.module('starter.services')
    .factory('ImageManager',
    ['$http', '$q', '$rootScope', 'baseServiceUrl', 'authManager', 'authorization',
        function ($http, $q, $rootScope, baseServiceUrl, authManager, authorization) {
            var imageApiUrl = baseServiceUrl + '/gallery';

            return {
                loadImageData: function (imageId) {
                    var deferred = $q.defer();

                    if (authManager.isAuthenticated()) {
                        var headers = authorization.getAuthorizationHeader();

                        $http({
                            url: imageApiUrl + '/image/' + imageId,
                            method: 'GET',
                            headers: headers,
                            withCredentials: true
                        })
                            .success(function (response) {
                                deferred.resolve(response);
                            })
                            .error(function (err) {
                                deferred.reject(err);
                            });
                    }

                    return deferred.promise;
                },
                addComment: function (imageId, commentBody) {
                    var deferred = $q.defer();

                    if (authManager.isAuthenticated()) {
                        var headers = authorization.getAuthorizationHeader();

                        $http({
                            url: imageApiUrl + '/image/' + imageId + '/comment/add',
                            method: 'POST',
                            headers: headers,
                            withCredentials: true,
                            data: {
                                commentBody: commentBody
                            }
                        })
                            .success(function (response) {
                                deferred.resolve(response);
                            })
                            .error(function (err) {
                                deferred.reject(err);
                            });
                    }

                    return deferred.promise;
                },
                loadComments: function (imageId) {
                    var deferred = $q.defer();

                    if (authManager.isAuthenticated()) {
                        var headers = authorization.getAuthorizationHeader();

                        $http({
                            url: imageApiUrl + '/image/' + imageId + '/comments',
                            method: 'GET',
                            headers: headers,
                            withCredentials: true
                        })
                            .success(function (response) {
                                deferred.resolve(response);
                            })
                            .error(function (err) {
                                deferred.reject(err);
                            });
                    }

                    return deferred.promise;
                }
            }
        }]);