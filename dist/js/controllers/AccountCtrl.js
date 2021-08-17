const AccountCtrl = angular.module('AccountCtrl', []); 

AccountCtrl.controller('AccountCtrl', function($scope, $rootScope, validationService, $http, $localStorage) {
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
      firstname: u.firstname ?? null, 
      lastname: u.lastname ?? null, 
      email: u.email ?? null,
    },
    add: { //fields for `details` mySQL table
      jobtitle: u.jobtitle ?? null,
      description: u.description ?? null,
      sector: u.sector ?? null,
      office: u.office ?? null, 
      mobile: u.mobile ?? null,   
      website: u.website ?? null,
      twitter: u.twitter ?? null, 
      instagram: u.instagram ?? null, 
      facebook: u.facebook ?? null
    }, 
  }

  $scope.password = ''; 

  $scope.result = null; 
  $scope.errors = []; 

  $scope.updateAccount = function() {
    //check if password has been provided.
    if(!$scope.password.trim()) {
      $scope.errors.push('password'); 
      $scope.password = '';
      return; 
    }
  
    //CORE VALUES: check if firstname/lastname/email have changed. 
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
          id: u.id,
          password: $scope.password, 
          core: coreDetails
        }
      })
      .then(function(response) {
        $scope.result = response.data;

        //save updated details to localStorage
        for (const [key, value] of Object.entries($scope.result.user)) {
          $localStorage.user[key] = value; 
        }

        $scope.errors = []; 

        return response.data;
      })
      .catch(function(error) {
        console.log(error);  
        throw error;
      })
    }

    //ADDITIONAL VALUES
    let detailsChanged = false;

    for (const [key, value] of Object.entries($scope.user.add)) {
      if(value !== u[key] || value !== null || value !== '') {
        detailsChanged = true; 
        break; 
      }
    } 

    if(detailsChanged) { //details have changed, update DB
      $http({
        url: 'php/includes/update-details.inc.php',
        method: 'POST', 
        data: {
          id: u.id,
          password: $scope.password, 
          details: $scope.user.add
        }
      })
      .then(function(response) {
        $scope.result = response.data;
        //save updated details to localStorage
        if($scope.result.success) {
          for (const [key, value] of Object.entries($scope.result.user)) {
            $localStorage.user[key] = value; 
          }
  
          $scope.errors = []; 
        } 

        $scope.password = ''; //update done, reset password
        $scope.myAccount.$setUntouched(); //set form to untouched state so no error msgs are showing
        return response.data;
      })
      .catch(function(error) {
        $scope.password = '';
        console.log(error);  
        throw error;
      })
    } else { //there are no changes, reset password
      $scope.password = '';
    }
  }

  //let user upload new profile image
  $scope.uploadImage = function() {
    let fd = new FormData();
    const files = document.getElementById('profile-image').files[0];
    fd.append('file', files);
    fd.append('id', $localStorage.user.id);

    $http({
      url: 'php/includes/upload-image.inc.php',
      method: 'post',
      data: fd, 
      headers: {'Content-Type': undefined},
    })
    .then(function(response) { 
      $localStorage.user.image = response.data.url;  
    })
    .catch(function(error) {
      $scope.errors.push(error); 
    });
  }
}); 