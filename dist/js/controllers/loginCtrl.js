const loginCtrl = angular.module('loginCtrl', []); 

loginCtrl.controller('loginCtrl', function($scope) {
  $scope.loginCredentials = {
    email: '', 
    password: ''
  }
}); 