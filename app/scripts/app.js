'use strict';

/**
 * @ngdoc overview
 * @name buttonmenApp
 * @description
 * # Implementation of Cheapass Games' Button Men
 *
 * Main module of the application.
 */


// transitional until old chat code is removed
var socket = io.connect();

angular
  .module('buttonmenApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/lobby.html',
        controller: 'LobbyController'
      })
      .when('/fight', {
        templateUrl: 'views/fight.html',
        controller: 'FightController'
      })
      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'HelpController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
