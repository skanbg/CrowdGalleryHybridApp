angular.module('starter.controllers')
    .controller('RegisterCtrl', function ($scope, $location, $http, $state, accountManager) {
        $scope.data = {};
        $scope.errors = [];

        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.register = function () {
            accountManager
                .signup($scope.data)
                .then(function (data) {
                    return accountManager.login($scope.data.email, $scope.data.password);
                })
                .then(function (data) {
                    $state.go('tab.feed');
                })
                .catch(function (err) {
                    $scope.errors = ['The service has a problem. Please, try again later!'];
                });
        }
    });