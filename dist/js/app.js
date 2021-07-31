const myApp = angular.module('myApp', ['ngRoute', 'homeCtrl', 'loginCtrl', 'signupCtrl']); 

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html', 
      controller: 'homeCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',  
      controller: 'loginCtrl'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html', 
      controller: 'signupCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);