const FollowersCtrl = angular.module('FollowersCtrl', []); 

FollowersCtrl.controller('FollowersCtrl', function($scope, $http, $localStorage, handleResponse, followersDetails) {

  // updating scope from data received from resolve
  handleResponse.handleResponse($scope, followersDetails, 'followers');   

  //allow user to unbook mark themselves.
  $scope.removeFromFollowers = function(id) {
    $http({
      url: 'php/includes/remove-follower.inc.php',
      method: 'POST', 
      data: {
        saved_user: $localStorage.user.id,
        saved_by: id
      }
    })
    .then(response => handleResponse.handleResponse($scope, response, 'followers'))
    .catch(error => console.log(error));
  }
});

