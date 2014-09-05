'use strict';

/**
 * @ngdoc function
 * @name myNgApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myNgApp
 */
angular.module('myNgApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'Grunt'
    ];
  });
