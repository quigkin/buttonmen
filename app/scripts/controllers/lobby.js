'use strict';

/**
 * @ngdoc function
 * @name buttonmenApp.controller:LobbyController
 * @description
 * # LobbyController
 * Controller of the buttonmenApp
 */
angular.module('buttonmenApp').controller('LobbyController', function ($scope, ChatService) {

    socket.on('rooms', function(rooms) {
        $scope.fights = rooms;
        $scope.$apply();
    });

});
