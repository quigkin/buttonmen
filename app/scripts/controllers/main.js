'use strict';

/**
 * @ngdoc function
 * @name buttonmenApp.controller:MainController
 * @description
 * # MainController
 * Controller of the buttonmenApp
 */
angular.module('buttonmenApp')
  .controller('MainController', function ($scope, ChatService) {

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
