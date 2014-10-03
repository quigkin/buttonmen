'use strict';

/**
 * @ngdoc function
 * @name buttonmenApp.controller:FightController
 * @description
 * # FightController
 * Controller of the buttonmenApp
 */
angular.module('buttonmenApp').controller('FightController', function ($scope, ChatService) {

    $scope.hostGame = function() {
        ChatService.hostGame();
    }

    $scope.$on('$locationChangeStart', function( event ) {
        if (confirmGiveUp()) {
            socket.emit('leave');
        }
    });

    $scope.$on('$viewContentLoaded', function(event) {
        $scope.hostGame();
    });

    // private functions

    function confirmGiveUp() {
        var answer = confirm("Are you sure you want to give up?")
        if (!answer) {
            event.preventDefault();
        }
        return answer;
    };

});
