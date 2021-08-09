const myApp = angular.module('myApp', ['ngRoute', 'ngStorage', 'HomeCtrl', 'LoginCtrl', 'SignupCtrl', 'AccountCtrl']); 

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
  // $locationProvider.hashPrefix('');

  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html', 
      controller: 'HomeCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',  
      controller: 'LoginCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html', 
      controller: 'SignupCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      resolve: {
        'checkLoggedIn': function($location, $rootScope) {
          if(!$rootScope.$storage.loggedIn) {
            $location.path('/login'); 
          }
        }
      }
    })
    .when('/account', {
      templateUrl: 'views/account.html',
      controller: 'AccountCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

myApp.controller('AppCtrl', function($scope, $rootScope, $location, $localStorage) {
  $rootScope.$storage = $localStorage; 
  
  $localStorage.loggedIn = $localStorage.loggedIn ?? false; 

  $scope.logoutUser = function() {
    $localStorage.loggedIn = false; 
    $localStorage.user = {}; 
    $location.path('/'); 
  }
}); 

//Service containing all the regexes for form data validation
myApp.service('validationService', function() {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i; 

  const stringRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/; 

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/;

  const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/; 

  const textRegex = /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð€\$£\"+@=_()*&^!?#;{}\/|\[\] ,.'-]+$/;

  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

  this.getEmailRegex = function() {
    return emailRegex;
  }

  this.getStringRegex = function() {
    return stringRegex;
  }

  this.getPasswordRegex = function() {
    return passwordRegex;
  }

  this.getUrlRegex = function() {
    return urlRegex;
  }

  this.getTextRegex = function() {
    return textRegex; 
  }

  this.getPhoneRegex = function() {
    return phoneRegex; 
  }
}); 