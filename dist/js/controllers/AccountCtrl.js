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

  const u = $rootScope.$storage.user;

  $scope.user = {
    firstname: u.firstname ?? '', 
    lastname: u.lastname ?? '', 
    jobtitle: u.jobtitle ?? '',
    description: u.description ?? '',
    sector: u.sector ?? '',
    office: u.office ?? '', 
    mobile: u.mobile ?? '', 
    email: u.email ?? '',  
    website: u.website ?? '',  
    social: {
      twitter: u.twitter ?? '', 
      instagram: u.instagram ?? '', 
      facebook: u.facebook ?? ''
    }
  }
}); 