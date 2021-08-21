const myApp = angular.module('myApp', ['ngRoute', 'ngSanitize', 'ngStorage', 'LoginCtrl', 'SignupCtrl', 'AccountCtrl', 'SearchCtrl', 'ProfileCtrl', 'ContactsCtrl', 'FollowersCtrl']); 

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
  // $locationProvider.hashPrefix('');

  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html'
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
    })
    .when('/account', {
      templateUrl: 'views/account.html',
      controller: 'AccountCtrl'
    })
    .when('/profile/:id', {
      templateUrl: 'views/profile-id.html',
      controller: 'ProfileCtrl', 
      resolve: {
        userDetails: function($http, $route) {
          return $http.get('php/includes/user.inc.php?id=' + $route.current.params.id)
            .then(function(response) {
              return response;
            }
          );
        }
      }
    })
    .when('/contacts', {
      templateUrl: 'views/contacts.html',
      controller: 'ContactsCtrl', 
      resolve: {
        contactsDetails: function($http, $localStorage) {
          return $http.get('php/includes/get-contacts.inc.php?id=' + $localStorage.user.id)
            .then(function(response) {
              return response;
            }
          );
        }
      }
    })
    .when('/followers', {
      templateUrl: 'views/followers.html',
      controller: 'FollowersCtrl',
      resolve: {
        followersDetails: function($http, $localStorage) {
          return $http.get('php/includes/get-followers.inc.php?id=' + $localStorage.user.id)
            .then(function(response) {
              return response;
            }
          );
        }
      }
    })
    .when('/privacy', {
      templateUrl: 'views/privacy.html'
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

  $scope.hiddenNav = true; 
  $scope.showHideNav = function() {
    $scope.hiddenNav = !$scope.hiddenNav; 
  }
}); 

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function (event) {
    //protect paths based on whether user is logged in/out
    const protectedPaths = ['/account', '/dashboard', '/contacts', '/followers']; 
    const publicPaths = ['/login', '/signup', '/'];

    const path = $location.path(); //get current path.

    //if user is not logged in - redirect to login
    if (!$rootScope.$storage.loggedIn && protectedPaths.includes(path)) {
      event.preventDefault();
      $location.path('/login'); 
    }

    //if user is logged in - redirect to dashboard
    if ($rootScope.$storage.loggedIn && publicPaths.includes(path)) {
      event.preventDefault();
      $location.path('/dashboard'); 
    }
  });
}]); 

//Service containing all the regexes for form data validation
myApp.service('validationService', function() {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i; 

  const stringRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/; 

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=.{8,})/;

  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/; 

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

//handle updating scope after http call.
myApp.service('handleResponse', function() {

  function handleResponse($scope, response, key) {
    $scope[key] = null; 
    $scope.error = null; 
    
    if(response.data.success === true) {
      $scope[key] = response.data[key]; 
      $scope.error = ''; 
    } else {
      $scope.error = response.data.error; 
    }
  }

  this.handleResponse = handleResponse; 
})