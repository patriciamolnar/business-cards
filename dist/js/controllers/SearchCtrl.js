const SearchCtrl = angular.module('SearchCtrl', []); 

SearchCtrl.controller('SearchCtrl', ['$scope', '$http', 'handleResponse', function($scope, $http, handleResponse) {
  $scope.searchTerm = ''; 

  $scope.searchUser = function() {
    $http({
      url: 'php/includes/search-user.inc.php?search=' + $scope.searchTerm,
      method: 'GET', 
    })
    .then(response => {
      handleResponse.handleResponse($scope, response, 'user');
      $scope.searchTerm = ''; 
    })
    .catch(error => console.log(error)); 
  }

  $scope.resetSearch = function() {
    $scope.searchTerm = ''; 
    $scope.user = null; 
    $scope.error = null; 
  }
}]); 