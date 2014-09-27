'use strict';

/**
 * @ngdoc function
 * @name buttonmenApp.controller:NavController
 * @description
 * # NavController
 * Controller of the buttonmenApp
 */
angular.module('buttonmenApp').controller('NavController', function ($scope, $location) {

    $scope.isActive = function(currentLocation) {
        return currentLocation === $location.path();
    }

});
