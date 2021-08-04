const myApp = angular.module('myApp', ['ngRoute', 'HomeCtrl', 'LoginCtrl', 'SignupCtrl']); 

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
      templateUrl: 'views/dashboard.html'
    }) 
    .otherwise({
      redirectTo: '/'
    });
}]);