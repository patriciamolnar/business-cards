const ProfileCtrl = angular.module('ProfileCtrl', []);

ProfileCtrl.controller('ProfileCtrl', function($scope, $http, $routeParams, $localStorage, handleResponse, userDetails) {  
  //update scope based on response received from $http call in resolve
  handleResponse.handleResponse($scope, userDetails, 'user'); 
  
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