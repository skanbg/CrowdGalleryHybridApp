'use strict';

angular.module('starter.services')
    .factory('authorization', ['authIdentity', function (authIdentity) {
        return {
            getAuthorizationHeader: function () {
                return {
                    'Authorization': 'Bearer ' + authIdentity.getCurrentAccessToken().token
                }
            }
        }
    }]);