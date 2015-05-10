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

angular.module('starter')
    .factory('personalGalleryManager',
    ['$http', '$q', '$rootScope', 'baseServiceUrl', 'authManager', 'authorization',
        function ($http, $q, $rootScope, baseServiceUrl, authManager, authorization) {
            var galleryApiUrl = baseServiceUrl + '/gallery';

            return {
                loadLastImages: function () {
                    var deferred = $q.defer();

                    if (authManager.isAuthenticated()) {
                        var headers = authorization.getAuthorizationHeader();

                        $http({
                            url: galleryApiUrl + '/personal',
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
                upload: function (ImageURI, imageTitle) {
                    var deferred = $q.defer();

                    if (authManager.isAuthenticated()) {
                        var headers = authorization.getAuthorizationHeader();

                        var options = new FileUploadOptions();
                        options.fileKey = 'image';
                        options.fileName = ImageURI.substr(ImageURI.lastIndexOf('/') + 1);
                        options.mimeType = 'image/jpeg';

                        var params = {};
                        params.title = imageTitle;

                        options.params = params;

                        options.headers = headers;
                        options.params = params;
                        options.chunkedMode = false;

                        var ft = new FileTransfer();

                        ft.upload(ImageURI, galleryApiUrl, function (response) {
                            deferred.resolve(response);
                        }, function (err) {
                            deferred.reject(err);
                        }, options);


                        //ft.upload(imageURI, encodedURI, function (response) {
                        //    sc.error = 'Successssss' + JSON.stringify(response);
                        //    deferred.resolve();
                        //}, function (err) {
                        //    sc.error = 'rejected' + JSON.stringify(err);
                        //    deferred.reject(err);
                        //}, options, false);

                        ////var fd = new FormData();
                        ////fd.append('image', image);
                        //headers['Content-Type'] = 'multipart/form-data';
                        //
                        ////var options = {};
                        ////options.fileKey = "image";
                        ////options.fileName = image.substr(image.lastIndexOf('/') + 1);
                        //////options.mimeType = "image/jpeg";
                        ////options.chunkedMode = false;
                        ////options.headers = headers;
                        ////
                        ////var ft = new FileTransfer();
                        ////ft.upload(image, encodeURI(galleryApiUrl), function (response) {
                        ////    sc.error = 'Successssss' + JSON.stringify(data);
                        ////    deferred.resolve();
                        ////}, function (err) {
                        ////    sc.error = 'rejected' + JSON.stringify(err);
                        ////    deferred.reject(err);
                        ////}, options);
                        //
                        ////$http.post(galleryApiUrl, fd, {
                        ////    headers: headers,
                        ////    transformRequest: angular.identity,
                        ////    withCredentials: true
                        ////})
                        //
                        //var formData = new FormData();
                        //formData.append("image", image);
                        //$http({
                        //    url: galleryApiUrl,
                        //    data: formData,
                        //    method: 'POST',
                        //    headers: headers,
                        //    //transformRequest: angular.identity,
                        //    withCredentials: true
                        //})
                        //    .success(function (response) {
                        //        sc.error = 'Successssss' + JSON.stringify(data);
                        //        deferred.resolve();
                        //    })
                        //    .error(function (err) {
                        //        sc.error = 'rejected' + JSON.stringify(err);
                        //        deferred.reject(err);
                        //    });
                        //
                        ////$http
                        ////    .post(galleryApiUrl, {image: image}, {
                        ////        withCredentials: true,
                        ////        headers: headers,
                        ////        transformRequest: angular.identity
                        ////    })
                        ////    .success(function (data) {
                        ////
                        ////        sc.error = 'Successssss' + JSON.stringify(data);
                        ////        deferred.resolve();
                        ////    }, function (response) {
                        ////
                        ////        sc.error = 'rejected' + JSON.stringify(response);
                        ////        deferred.reject(response);
                        ////    });
                    } else {
                        deferred.reject('User is not logged!');
                    }

                    return deferred.promise;
                }
            }
        }]);