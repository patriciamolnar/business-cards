const ContactsCtrl = angular.module('ContactsCtrl', []); 

ContactsCtrl.controller('ContactsCtrl', function($scope, $http, $localStorage) {
  //get all contacts from DB
  $http.get('php/includes/get-contacts.inc.php?id=' + $localStorage.user.id)
    .then(function(response) {
      if(response.data.success === true) {
        $scope.contacts = response.data.contacts; 
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

