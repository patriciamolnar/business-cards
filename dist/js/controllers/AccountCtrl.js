const AccountCtrl = angular.module('AccountCtrl', []); 

AccountCtrl.controller('AccountCtrl', function($scope, $rootScope, validationService, $http) {
  $scope.regex = {
    email: validationService.getEmailRegex(),
    string: validationService.getStringRegex(),
    text: validationService.getTextRegex(),
    phone: validationService.getPhoneRegex(),
    url: validationService.getUrlRegex(),
    password: validationService.getPasswordRegex(), 
  }

  $scope.sectors = [
    'Accountancy, Banking & Finance',
    'Business, Consulting & Management', 
    'Charity & Voluntary Work',
    'Creative Arts & Design',
    'Energy & Utilities', 
    'Engineering & Manufacturing',
    'Environment & Agriculture',
    'Healthcare', 
    'Hospitality & Events Management',
    'Information Technology',
    'Law', 
    'Law Enforcement & Security',
    'Leisure, Sport & Tourism',
    'Marketing, Advertising and PR', 
    'Media & Internet',
    'Property & Construction',
    'Public Services & Administration', 
    'Recruitment & HR', 
    'Retail', 
    'Sales',
    'Science & Pharmaceuticals', 
    'Social Care', 
    'Teacher training and education',
    'Transport & logistics',
    'Other'
  ];

  const u = $rootScope.$storage.user;

  $scope.user = {
    core: { //fields for `users` mySQL table
      firstname: u.firstname ?? '', 
      lastname: u.lastname ?? '', 
      email: u.email ?? '',
    },
    add: { //fields for `details` mySQL table
      jobtitle: u.jobtitle ?? '',
      description: u.description ?? '',
      sector: u.sector ?? '',
      office: u.office ?? '', 
      mobile: u.mobile ?? '',   
      website: u.website ?? '',
      twitter: u.twitter ?? '', 
      instagram: u.instagram ?? '', 
      facebook: u.facebook ?? ''
    }, 
  }

  $scope.password = ''; 

  $scope.result = null; 
  $scope.errors = []; 

  $scope.updateAccount = function() {
    //check if password has been provided.
    if(!$scope.password.trim()) {
      $scope.errors.push('Please provide your password to save the changes'); 
      return; 
    }
  
    //check if any of the core values have changed. 
    const coreDetails = {};
    for (const [key, value] of Object.entries($scope.user.core)) {
      if(value !== u[key]) {
        coreDetails[key] = value;
      }
    }

    if(Object.keys(coreDetails).length !== 0) { //details have changed, update DB
      $http({
        url: 'php/includes/update-account.inc.php',
        method: 'POST', 
        data: {
          originalEmail: u.email, //for account validation send original email and passw.
          password: $scope.password, 
          core: coreDetails
        }
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);  
        throw error;
      })
    }
  }
}); 