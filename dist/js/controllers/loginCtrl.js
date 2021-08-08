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
      console.log(response.data);
      console.log($scope.result); 
      $localStorage.loggedIn = true; //log user in

      //save details to local storage
      const u = $scope.result.user;

      $localStorage.user = {
        id: u.uid, 
        firstname: u.firstname, 
        lastname: u.lastname, 
        email: u.email,
        jobtitle: u.jobtitle, 
        description: u.description,
        sector: u.sector, 
        office: parseInt(u.office, 10), 
        mobile: parseInt(u.mobile, 10),
        website: u.website, 
        twitter: u.twitter, 
        instagram: u.instagram, 
        facebook: u.facebook
      };
    
      $location.path('/dashboard'); //redirect to dashboard
      return response.data;
    })
    .catch(function(error) {
      $scope.status = error.status; 
      throw error;
    });
  }
}); 