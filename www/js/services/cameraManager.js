angular.module('starter.services')
    .factory('Camera', ['$q', function ($q) {

        return {
            getPicture: function (options) {
                var q = $q.defer();

                //if (navigator && navigator.camera) {
                options['destinationType'] = Camera.DestinationType.FILE_URI;
                navigator.camera.getPicture(function (result) {
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);

                return q.promise;
            }
        }
    }]);