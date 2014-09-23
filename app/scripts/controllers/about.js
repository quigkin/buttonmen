'use strict';

/**
 * @ngdoc function
 * @name buttonmenApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the buttonmenApp
 */
angular.module('buttonmenApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Grunt'
    ];
  });
