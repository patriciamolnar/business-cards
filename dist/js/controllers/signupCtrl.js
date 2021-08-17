const SignupCtrl = angular.module('SignupCtrl', []); 

SignupCtrl.controller('SignupCtrl', function($scope, $http, validationService) {

  //regexes
  $scope.emailRegex = validationService.getEmailRegex(); 
  $scope.stringRegex = validationService.getStringRegex(); 
  $scope.passwordRegex = validationService.getPasswordRegex();

  //data for signup
  $scope.user = {
    firstname: '', 
    lastname: '',
    email: '', 
    password: ''
  }

  $scope.result = '';

  //send data to PHP file 
  $scope.registerUser = function() {
    $http({
      url: 'php/includes/signup.inc.php',
      method: 'POST', 
      data: $scope.user
    })
    .then(function(response) {
      $scope.result = response.data; 
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