const AccountCtrl = angular.module('AccountCtrl', []); 

AccountCtrl.controller('AccountCtrl', function($scope, $rootScope, validationService) {
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

  $scope.user = {
    firstname: $rootScope.$storage.firstname ?? '', 
    lastname: $rootScope.$storage.lastname ?? '', 
    jobtitle: $rootScope.$storage.jobtitle ?? '',
    description: $rootScope.$storage.description ?? '',
    sector: $rootScope.$storage.sector ?? '',
    office: $rootScope.$storage.office ?? '', 
    mobile: $rootScope.$storage.mobile ?? '', 
    email: $rootScope.$storage.email ?? '',  
    website: $rootScope.$storage.website ?? '',  
    social: {
      twitter: $rootScope.$storage.twitter ?? '', 
      instagram: $rootScope.$storage.instagram ?? '', 
      facebook: $rootScope.$storage.facebook ?? ''
    }
  }
}); 