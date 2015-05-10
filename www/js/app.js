// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngResource', 'ngCookies'])

    //.config(function ( $httpProvider) {
    //    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //})
    .config(function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(
    function ($compileProvider) {
        //  Default imgSrcSanitizationWhitelist: /^\s*(https?|ftp|file):|data:image\//
        //  chrome-extension: will be added to the end of the expression
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension):|data:image\//);
    })

    //.constant('baseServiceUrl', 'http://localhost:3000')
    .constant('baseServiceUrl', 'https://crowdgallery.herokuapp.com')

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            })

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.feed', {
                url: '/feed',
                views: {
                    'tab-feed': {
                        templateUrl: 'templates/tab-feed.html',
                        controller: 'FeedCtrl'
                    }
                }
            })

            .state('tab.gallery', {
                url: '/gallery',
                views: {
                    'tab-gallery': {
                        templateUrl: 'templates/tab-personal-gallery.html',
                        controller: 'PersonalGalleryCtrl'
                    }
                }
            })
            .state('image-details', {
                url: '/gallery/image/:imageId',
                //views: {
                //    'tab-gallery': {
                //        templateUrl: 'templates/image-details.html',
                //        controller: 'ImageCtrl'
                //    }
                //}
                templateUrl: 'templates/image-details.html',
                controller: 'ImageCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        //$urlRouterProvider.otherwise('/tab/gallery');
        $urlRouterProvider.otherwise('/login');

    });
