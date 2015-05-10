'use strict';

angular.module('starter')
    .factory('accountManager',
    ['$http', '$q', '$rootScope', 'baseServiceUrl', 'authManager', 'authorization', 'userIdentity', 'authIdentity',
        function ($http, $q, $rootScope, baseServiceUrl, authManager, authorization, userIdentity, authIdentity) {
            var accountApiUrl = baseServiceUrl + '/account';

            return {
                login: function (email, password) {
                    var deferred = $q.defer();

                    authManager
                        .login(email, password)
                        .then(function (result) {
                            deferred.resolve(result);
                        }, function (err) {
                            deferred.reject(err);
                        });

                    return deferred.promise;
                },
                signup: function (user) {
                    var deferred = $q.defer();

                    $http.post(accountApiUrl + '/create', user)
                        .success(function () {
                            deferred.resolve();
                        }, function (response) {
                            deferred.reject(response);
                        });

                    return deferred.promise;
                },
                loadCurrentUserData: function () {
                    var deferred = $q.defer();

                    if (authIdentity.isAuthenticated()) {
                        var headers = authorization.getAuthorizationHeader();

                        $http.get(accountApiUrl + '/info', {headers: headers})
                            .success(function (data) {
                                userIdentity.setCurrentUser(data);
                                return data;
                            })
                            .success(function (data) {
                                deferred.resolve(data);
                            })
                            .error(function (error) {
                                deferred.reject(error);
                            });
                    } else {
                        deferred.reject('User is not logged!');
                    }

                    return deferred.promise;
                }
            }
        }]);