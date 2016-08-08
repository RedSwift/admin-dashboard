angular.module('adminApp', ['ngMaterial', 'ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      template: '<login></login>'
    })
    .when('/haha', {
      template: '<h1> haha </h1>'
    })
    .otherwise({
      redirectTo: '/'
    })
  })
