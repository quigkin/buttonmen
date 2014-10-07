'use strict';

/**
 * @ngdoc function
 * @name buttonmenApp.controller:LobbyController
 * @description
 * # LobbyController
 * Controller of the buttonmenApp
 */
angular.module('buttonmenApp').controller('LobbyController', function ($scope, $location, ChatService) {

    // should these move to a service with state
    // so i call register for these events and
    // they only setup a listener once?
    //
    // i would like to be able to have multiple listeners
    // for the same event
    // TODO: when returning to the Lobby, the guests/rooms don't refresh
    if (socket.listeners('rooms')[0] === undefined) {
    socket.on('rooms', function(rooms) {
        $scope.fights = rooms;
        $scope.$apply();
    });
    }

    if (socket.listeners('fighters')[0] === undefined) {
    socket.on('fighters', function(fighters) {
        $scope.fighters = $scope.parseFighters(fighters);
        $scope.$apply();
    });
    }

    if (socket.listeners('invite')[0] === undefined) {
    socket.on('invite', function(data) {
        if (data['confirmation'] === undefined) {
            data['confirmation'] =  confirm(data['name'] + " is challenging you! Fight?");
            socket.emit('invite', data);
        }
        // if the invitation was accepted by either side
        if (data['confirmation']) {
            // TODO: they need to join the same room!!!
            $location.path("/fight");
        }
    });
    }

    $scope.$on('$locationChangeStart', function(event) {
        socket.emit('leave');
    });

    $scope.$on('$viewContentLoaded', function(event) {
        socket.emit('join', {newRoom: 'Lobby'});
        socket.emit('fighters');
        socket.emit('rooms');
    });

    $scope.parseFighters = function(fighters) {
        var parsed = [], name = "";
        for (var socketId in fighters) {
            name = fighters[socketId];
            if (name !== $scope.nickname) {
                parsed.push({name: name, socketId: socketId});
            }
        }
        return parsed;
    };

    $scope.pickAFight = function(otherFighter) {
        if (confirmFight()) {
            socket.emit('invite', otherFighter);
        }
    };

    function confirmFight() {
        var answer = confirm("Are you sure you want to pick a fight? You might get hurt.")
        if (!answer) {
            event.preventDefault();
        }
        return answer;
    };

});
