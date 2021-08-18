//<search-component></search-component>
myApp.directive('searchComponent', function() {
  return {
    restrict: 'E', 
    scope: {}, 
    templateUrl: 'views/components/search.html',
    controller: 'SearchCtrl'
  }
});