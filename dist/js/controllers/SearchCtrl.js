const SearchCtrl = angular.module('SearchCtrl', []); 

SearchCtrl.controller('SearchCtrl', function($scope, $http) {
  $scope.searchTerm = ''; 

  $scope.searchUser = function() {
    $http({
      url: 'php/includes/search-user.inc.php?search=' + $scope.searchTerm,
      method: 'GET', 
    })
    .then(function(response) {
      if(response.data.success === true) {
        $scope.user = response.data.user;
        $scope.error = '';
      } else {
        $scope.error = response.data.error;
      }
      
      $scope.searchTerm = ''; 
    })
    .catch(function(error) {
      console.log(error);  
      throw error;
    })
  }

  $scope.resetSearch = function() {
    $scope.searchTerm = ''; 
    $scope.user = null; 
    $scope.error = null; 
  }
}); 