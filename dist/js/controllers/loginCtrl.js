const LoginCtrl = angular.module('LoginCtrl', []); 

LoginCtrl.controller('LoginCtrl', function($scope) {
  $scope.loginCredentials = {
    email: '', 
    password: ''
  }
}); 