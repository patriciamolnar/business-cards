const FollowersCtrl = angular.module('FollowersCtrl', []); 

FollowersCtrl.controller('FollowersCtrl', function($scope, $http, $localStorage) {
  //get all contacts from DB
  $http.get('php/includes/get-followers.inc.php?id=' + $localStorage.user.id)
    .then(function(response) {
      if(response.data.success === true) {
        $scope.followers = response.data.followers; 
        $scope.error = ''; 
      } else {
        $scope.error = response.data.error; 
      }
    })
    .catch(function(error) {
      console.log(error); 
      $scope.error = error; 
    });
});

