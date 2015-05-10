angular.module('starter.controllers')
    .controller('ImageCtrl', function ($scope, baseServiceUrl, $stateParams, $location, ImageManager, $state) {
        $scope.imageId = $stateParams.imageId;
        $scope.baseServiceUrl = baseServiceUrl;

        var commentLoad = function () {
            ImageManager.loadComments($scope.imageId)
                .then(function (result) {
                    $scope.comments = result;
                    console.log($scope.comments);
                });
        };

        ImageManager.loadImageData($scope.imageId)
            .then(function (result) {
                $scope.image = result;
            });

        commentLoad();

        $scope.sendComment = function () {
            ImageManager.addComment($scope.imageId, $scope.commentText)
                .then(function (result) {
                    commentLoad();
                })
        };
    });