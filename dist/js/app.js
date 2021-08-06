const myApp = angular.module('myApp', ['ngRoute', 'ngStorage', 'HomeCtrl', 'LoginCtrl', 'SignupCtrl']); 

myApp.config(['$routeProvider', function($routeProvider) {
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
    .otherwise({
      redirectTo: '/'
    });
}]);

myApp.controller('AppCtrl', function($scope, $rootScope, $location, $localStorage) {
  $rootScope.$storage = $localStorage; 
  
  $localStorage.loggedIn = false; 

  $scope.logoutUser = function() {
    $localStorage.loggedIn = false; 
    $location.path('/'); 
  }
}); 