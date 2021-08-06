const LoginCtrl = angular.module('LoginCtrl', []); 

LoginCtrl.controller('LoginCtrl', function($scope, $http, $location, $localStorage) {
  
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
      $localStorage.loggedIn = true; //log user in

      //save details to local storage
      $localStorage.firstname = $scope.result.user.firstname;
      $localStorage.lastname = $scope.result.user.lastname; 
      $localStorage.email = $scope.result.user.email; 

      $location.path('/dashboard'); //redirect to dashboard
      return response.data;
    })
    .catch(function(error) {
      $scope.status = error.status; 
      throw error;
    });
  }
}); 