angular.module('starter.controllers', [])

    .controller('FeedCtrl', function ($scope, $http, baseServiceUrl, $rootScope, $location, Camera, publicGalleryManager) {
        $scope.baseServiceUrl = baseServiceUrl;

        var loadGalleryImages = function () {
            publicGalleryManager.loadLastImages()
                .then(function (result) {
                    $scope.lastImages = result.lastUploads;
                    console.log(result);
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $scope.go = function (path) {
            $location.path(path);
        };

        $rootScope.$on('gallery.ImageIsUploaded', function (event, data) {
            loadGalleryImages();
        });

        loadGalleryImages();
    });
