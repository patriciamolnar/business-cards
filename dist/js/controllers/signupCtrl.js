const SignupCtrl = angular.module('SignupCtrl', []); 

SignupCtrl.controller('SignupCtrl', function($scope, $http, validationService) {

  //regexes
  $scope.emailRegex = validationService.getEmailRegex(); 
  $scope.stringRegex = validationService.getStringRegex(); 
  $scope.passwordRegex = validationService.getPasswordRegex();

  //data for signup
  $scope.user = {
    firstname: null, 
    lastname: null,
    email: null, 
    password: null
  }

  $scope.result = null;

  //send data to PHP file 
  $scope.registerUser = function() {
    $http({
      url: 'php/includes/signup.inc.php',
      method: 'POST', 
      data: $scope.user
    })
    .then(function(response) {
      $scope.result = response.data; 
    })
    .catch(function(error) {
      console.log(error); 
    });
  } 
}); 