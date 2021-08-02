const SignupCtrl = angular.module('SignupCtrl', []); 

SignupCtrl.controller('SignupCtrl', function($scope, $http) {

  //regexes
  $scope.emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i; 
  $scope.stringRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/; 
  $scope.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/;

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
      console.log('Status: ' + $scope.status);
      throw error;
    });
  }
}); 