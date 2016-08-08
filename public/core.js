angular.module('adminApp', ['ngMaterial', 'ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      template: '<login></login>'
    })
    .when('/signup', {
      template: '<sign-up></sign-up>'
    })
    .when('/home', {
      template: '<h1> Home Page </h1>'
    })
    .otherwise({
      redirectTo: '/'
    })
  })
