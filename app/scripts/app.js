'use strict';
/* global app:true */
/* exported app */

/**
 * @ngdoc overview
 * @name angNewsApp
 * @description
 * # angNewsApp
 *
 * Main module of the application.
 */
var app = angular
  .module('angNewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .constant('FIREBASE_URL', 'https://edentest1.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/posts/:postId', {
        templateUrl: 'views/showpost.html',
        controller: 'PostViewCtrl'
      })
      .when('/news', {
        templateUrl: 'views/news.html',
        controller: 'NewsCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.resolveUser();
          }
        }
      })
      .when('/', {
        templateUrl: 'views/main.html',
      })
      .when('/dashboard', {
        templateUrl: ' views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/users/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/registerpg', {
        templateUrl : 'views/register2.html',
        controller: 'AuthenticationCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
