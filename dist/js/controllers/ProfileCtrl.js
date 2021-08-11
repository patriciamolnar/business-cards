const ProfileCtrl = angular.module('ProfileCtrl', []);

ProfileCtrl.controller('ProfileCtrl', function($scope, $http, $routeParams, $localStorage) {
  $http({
    url: 'php/includes/user.inc.php?id=' + $routeParams.id,
    method: 'GET'
  })
  .then(function(response) {
    $scope.user = response.data.user; 
    console.log(response.data);
    if(response.data.success === false) {
      $scope.error = response.data.error;
    }
  })
  .catch(function(error) {
    console.log(error); 
    $scope.error = error; 
    throw error; 
  })

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
      console.log(response);
    })
    .catch(function(error) {
      console.log(error); 
    })
  }
});