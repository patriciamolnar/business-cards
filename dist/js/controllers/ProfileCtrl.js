const ProfileCtrl = angular.module('ProfileCtrl', []);

ProfileCtrl.controller('ProfileCtrl', function($scope, $http, $routeParams, $localStorage, handleResponse) {  
  // query user data from DB on page load
  $http({
    url: 'php/includes/user.inc.php?id=' + $routeParams.id,
    method: 'GET'
  })
  .then(response => handleResponse.handleResponse($scope, response, 'user'))
  .catch(error => console.log(error));
  
  //if user is logged in, get appropriate text for 'Save Contact' button. 
  if($localStorage.loggedIn === true) {
    $http({
      url: 'php/includes/is-contact.inc.php?saved_user=' + $routeParams.id + '&saved_by=' + $localStorage.user.id,
      method: 'GET'
    })
    .then(function(response) {
      if(response.data.saved === true) {
        $scope.btnMessage = 'Unsave Contact';
      } else {
        $scope.btnMessage = 'Save Contact';
      }
    })
    .catch(function(error) {
      console.log(error); 
    });
  }

  //save or unsave contact and update button text accordingly 
  $scope.saveContact = function(id) {
    $http({
      url: 'php/includes/save-contact.inc.php', 
      method: 'POST', 
      data: {
        saved_user: id, 
        saved_by: $localStorage.user.id
      }
    })
    .then(function(response) {
      if(response.data.success === true) {
        if(response.data.message === 'saved') {
          $scope.btnMessage = 'Unsave Contact';
        }

        if(response.data.message === 'unsaved') {
          $scope.btnMessage = 'Save Contact';
        }
      } else {
        $scope.error = response.data.error; 
      }
    })
    .catch(function(error) {
      $scope.error = error;
      console.log(error); 
      throw error; 
    })
  }
});