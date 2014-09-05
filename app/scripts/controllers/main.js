'use strict';

/**
 * @ngdoc function
 * @name myNgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myNgApp
 */
angular.module('myNgApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
