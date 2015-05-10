'use strict';

function readFileAsBinaryString(file) {
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        return evt.target.result;
    };
    reader.onerror = function (evt) {
        // error handlinghttps://community.idolondemand.com/t5/tkb/articleeditorpage/tkb-id/tkb_idol/message-uid/200
    };
    reader.readAsBinaryString(file);
}

angular.module('starter.services')
    .factory('publicGalleryManager',
    ['$http', '$q', '$rootScope', 'baseServiceUrl', 'authManager', 'authorization',
        function ($http, $q, $rootScope, baseServiceUrl, authManager, authorization) {
            var galleryApiUrl = baseServiceUrl + '/gallery';

            return {
                loadLastImages: function () {
                    var deferred = $q.defer();

                    if (authManager.isAuthenticated()) {
                        var headers = authorization.getAuthorizationHeader();

                        $http({
                            url: galleryApiUrl,
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