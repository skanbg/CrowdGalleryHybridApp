'use strict';

angular.module('starter')
    .factory('userIdentity', ['$cookieStore', '$rootScope', function ($cookieStore, $rootScope) {
        var cookieStorageUserKey = 'currentApplicationUserKey';

        var currentUser;

        var actions = {
            getCurrentUser: function () {
                var savedUser = $cookieStore.get(cookieStorageUserKey);
                if (savedUser) {
                    currentUser = savedUser;
                }

                return currentUser;
            },
            setCurrentUser: function (userData) {
                if (userData) {
                    $cookieStore.put(cookieStorageUserKey, userData);
                    $rootScope.$emit('userIdentity.UserHasLoaded', userData);
                }
                else {
                    $cookieStore.remove(cookieStorageUserKey);
                    $rootScope.$emit('userIdentity.UserHasUnloaded');
                }

                currentUser = userData;
            },
            isAuthenticated: function () {
                return !!this.getCurrentUser();
            }
        };

        $rootScope.$on('authIdentity.AccessRevoked', function (event, data) {
            actions.setCurrentUser();
        });

        return actions;
    }]);