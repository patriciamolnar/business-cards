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
          console.log($rootScope); 
          if(!$rootScope.loggedIn) {
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
  $rootScope.initLocalStorage = function() {
    $rootScope.localStorage = $localStorage;
    $rootScope.loggedIn = $rootScope.localStorage.loggedIn;
    if($rootScope.loggedIn === undefined) {
      $rootScope.loggedIn = false; 
    }
  }  

  $rootScope.initLocalStorage();

  $scope.logout = function() {
    $rootScope.localStorage.loggedIn = false;
    $location.path('/'); 
  }
}); 