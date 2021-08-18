const FollowersCtrl = angular.module('FollowersCtrl', []); 

FollowersCtrl.controller('FollowersCtrl', function($scope, $http, $localStorage, handleResponse) {

  //get all contacts from DB
  $http.get('php/includes/get-followers.inc.php?id=' + $localStorage.user.id)
    .then(response => handleResponse.handleResponse($scope, response, 'followers'))
    .catch(error => console.log(error));

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

