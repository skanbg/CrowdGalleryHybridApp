'use strict';

angular.module('starter')
    .factory('authManager', ['$http', '$q', '$rootScope', 'authIdentity', 'authorization', 'baseServiceUrl',
        function ($http, $q, $rootScope, authIdentity, authorization, baseServiceUrl) {
            var accountUrl = baseServiceUrl + '/account';

            return {
                login: function (email, password) {
                    var deferred = $q.defer();

                    $http.post(accountUrl + '/login', {
                        email: email,
                        password: password
                    })
                        .success(function (response) {
                            if (!response['token']) {
                                throw new Error('Missing access token in the response!');
                            }

                            authIdentity.setCurrentAccessToken(response.token);
                            deferred.resolve();
                        })
                        .catch(function (err) {
                            deferred.reject(err);
                        });

                    return deferred.promise;
                },
                isAuthenticated: function () {
                    if (authIdentity.isAuthenticated()) {
                        return true;
                    }
                    else {
                        return $q.reject('not authorized');
                    }
                }
            }
        }]);