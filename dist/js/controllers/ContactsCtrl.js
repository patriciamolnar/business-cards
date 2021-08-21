const ContactsCtrl = angular.module('ContactsCtrl', []); 

ContactsCtrl.controller('ContactsCtrl', ['$scope', 'handleResponse', 'contactsDetails', function($scope, handleResponse, contactsDetails) {
  // updating scope from data received from resolve
  handleResponse.handleResponse($scope, contactsDetails, 'contacts'); 
}]);

