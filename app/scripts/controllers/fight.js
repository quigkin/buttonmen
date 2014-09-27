'use strict';

/**
 * @ngdoc function
 * @name buttonmenApp.controller:FightController
 * @description
 * # FightController
 * Controller of the buttonmenApp
 */
angular.module('buttonmenApp').controller('FightController', function ($scope, $location, ChatService) {

    $scope.hostGame = function() {
        ChatService.hostGame();
    }

    if ($location.path() === '/fight') {
        $scope.hostGame();
    }

});
