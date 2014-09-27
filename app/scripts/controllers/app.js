'use strict';

/**
 * @ngdoc function
 * @name buttonmenApp.controller:AppController
 * @description
 * # AppController
 * Controller of the buttonmenApp
 */
angular.module('buttonmenApp').controller('AppController', function ($scope, ChatService, $location) {

    $scope.location = $location;

    $scope.inputName = function() {
        $scope.enteringName = true;
        $scope.originalName = $scope.nickname;
    };

    $scope.submitName = function() {
        ChatService.changeName($scope.nickname);
    };

    $scope.resetName = function() {
        $scope.nickname = $scope.originalName;
        $scope.enteringName = false;
        $scope.name_form.nicknameEntry.$setValidity('stored', true);
    };

    socket.on('nameResult', function(result) {
        if (result.success) {
            $scope.nickname = result.name;
            $scope.enteringName = false;
        } else {
            $scope.changeErrorMessage = result.message;
        }
        $scope.name_form.nicknameEntry.$setValidity('stored', result.success);
        $scope.$apply();
    });

});
