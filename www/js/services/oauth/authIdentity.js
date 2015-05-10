'use strict';

angular.module('starter.services')
    .factory('authIdentity', ['$cookieStore', '$rootScope', function ($cookieStore, $rootScope) {
        var cookieStorageAccessToken = 'currentApplicationAccessToken',
            currentAccessToken;

        return {
            getCurrentAccessToken: function () {
                var savedAccessToken = $cookieStore.get(cookieStorageAccessToken);

                if (savedAccessToken) {
                    currentAccessToken = savedAccessToken;
                }

                return currentAccessToken;
            },
            setCurrentAccessToken: function (accessToken) {
                if (accessToken) {
                    $cookieStore.put(cookieStorageAccessToken, accessToken);
                    $rootScope.$emit('authIdentity.AccessGranted', accessToken);
                }
                else {
                    $cookieStore.remove(cookieStorageAccessToken);
                    $rootScope.$emit('authIdentity.AccessRevoked');
                }

                currentAccessToken = accessToken;
            },
            closeSession: function () {
                this.setCurrentAccessToken();
            },
            isAuthenticated: function () {
                return !!this.getCurrentAccessToken();
            }
        }
    }]);