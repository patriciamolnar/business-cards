const ProfileCtrl = angular.module('ProfileCtrl', []);

ProfileCtrl.controller('ProfileCtrl', function($scope, $http, $routeParams, $localStorage) {
  $scope.btnMessage = 'Save Contact'
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