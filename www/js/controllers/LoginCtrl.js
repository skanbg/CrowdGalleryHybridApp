angular.module('starter.controllers')
    .controller('LoginCtrl', function ($scope, $location, $http, $state, accountManager) {
        $scope.data = {};
        $scope.errors = [];

        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.login = function () {
            accountManager
                .login($scope.data.email, $scope.data.password)
                .then(function (data) {
                    $state.go('tab.feed');
                })
                .catch(function (err) {
                    $scope.errors = ['The service has a problem. Please, try again later!'];

                    if (err && err.data && err.data.error) {
                        if (err.data && err.data.error.name == 'InvalidCredentialsError') {
                            $scope.errors = ['Invalid login credentials!'];
                        } else if (err.data && err.data.error.name == 'UserAccountIsLockedError') {
                            $scope.errors = ['Failed to login too many times! The account is now locked for 5 minutes'];
                        }
                    }
                });
        }
    });