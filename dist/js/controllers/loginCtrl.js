const LoginCtrl = angular.module('LoginCtrl', []); 

LoginCtrl.controller('LoginCtrl', function($scope, $http, $location) {
  $scope.loginCredentials = {
    email: '', 
    password: ''
  }

  $scope.result = null; 
  $scope.status = null; 

  $scope.loginUser = function() {
    $http({
      url: 'php/includes/login.inc.php',
      method: 'POST', 
      data: $scope.loginCredentials
    })
    .then(function(response) {
      $scope.result = response.data; 
      $location.path('/dashboard');
      console.log($scope.result);
      return response.data;
    })
    .catch(function(error) {
      $scope.status = error.status; 
      console.log($scope.status);
      throw error;
    });
  }
}); 