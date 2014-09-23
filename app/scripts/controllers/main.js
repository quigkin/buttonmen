'use strict';

/**
 * @ngdoc function
 * @name buttonmenApp.controller:MainController
 * @description
 * # MainController
 * Controller of the buttonmenApp
 */
angular.module('buttonmenApp')
  .controller('MainController', function ($scope) {
    $scope.nickname = 'Guest 1242341';




    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
