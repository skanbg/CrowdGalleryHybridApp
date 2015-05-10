angular.module('starter.controllers')
    .controller('PersonalGalleryCtrl', function ($scope, $http, $rootScope, $location, baseServiceUrl, Camera, personalGalleryManager) {
        $scope.baseServiceUrl = baseServiceUrl;

        $scope.go = function (path) {
            $location.path(path);
        };

        //$http({
        //    url: 'http://localhost:3000/gallery/image/554f086b55a4cf840f427f94',
        //    method: 'GET'
        //    //headers: {
        //    //    'Authorization': 'Bearer qhzdcz5EXTMDghaqY5Jyhfo6ihgcg3NlKqh2Ewg5JfWhLmZleC1lnU17hmGRKPVlSC71YXImzFDLvHveZM5SMykiDgERd7zv2D7m5dStm0q1Fk617pF24v9VGWWB99OEbNteIKVYtRbWtb5lWDZN5zxt2b9XxpnMNulx3CJNfhZ45Qp0SJtqijaGjMT82B2ErbfF6oXIc6sqevj14IWmicADYBq4iDHcFhCYtfCNI4LcbtprgdKwhACHVDkrjbrK'
        //    //},
        //    //withCredentials: true
        //})
        //    .success(function (response) {
        //        //$scope.img = 'data:image/png;base64,' + btoa(response);
        //    })
        //    .error(function (err) {
        //        console.log(err);
        //    });


        var loadGalleryImages = function () {
            personalGalleryManager.loadLastImages()
                .then(function (result) {
                    $scope.lastImages = result.lastUploads;
                    console.log(result);
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $rootScope.$on('gallery.ImageIsUploaded', function (event, data) {
            loadGalleryImages();
        });


        $scope.upload = function () {
            Camera.getPicture({
                quality: 75,
                targetWidth: 320,
                targetHeight: 320,
                saveToPhotoAlbum: false
            })
                .then(function (imageURI) {
                    $scope.imageURI = imageURI;

                    personalGalleryManager
                        .upload(imageURI, 'Test title')
                        .then(function (res) {
                            $rootScope.$emit('gallery.ImageIsUploaded');
                            $scope.message = 'The photo is uploaded!';
                            //$scope.error = JSON.stringify(res);
                        })
                        .catch(function (err) {
                            //$scope.error = JSON.stringify(err);
                        });
                }, function (err) {
                    //$scope.error = JSON.stringify(err);
                });
        };

        loadGalleryImages();
    });