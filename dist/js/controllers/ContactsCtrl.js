const ContactsCtrl = angular.module('ContactsCtrl', []); 

ContactsCtrl.controller('ContactsCtrl', function($scope, $http, $localStorage, handleResponse) {
  //get all contacts from DB
  $http.get('php/includes/get-contacts.inc.php?id=' + $localStorage.user.id)
    .then(response => handleResponse.handleResponse($scope, response, 'contacts'))
    .catch(error => console.log(error));
});

