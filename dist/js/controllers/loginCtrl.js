const LoginCtrl = angular.module('LoginCtrl', []); 

LoginCtrl.controller('LoginCtrl', ['$scope', '$http', '$location', '$localStorage', function($scope, $http, $location, $localStorage) {
  
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

      if(response.data.errors === '') { //only log in user if there is no error
        $localStorage.loggedIn = true; 
        $localStorage.user = {}; 

        //save details to local storage
        for (const [key, value] of Object.entries($scope.result.user)) {
          $localStorage.user[key] = value; 
        }
      
        $location.path('/dashboard'); //redirect to dashboard
      }
      
      return response.data;
    })
    .catch(function(error) {
      $scope.status = error.status; 
      throw error;
    });
  }
}]); 