angular.module('adminApp', ['ngMaterial', 'ngRoute'])
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('blue')
    $routeProvider
    .when('/', {
      template: '<login></login>'
    })
    .when('/signup', {
      template: '<sign-up></sign-up>'
    })
    .when('/home', {
      template: '<home></home>'
    })
    .when('/attendance', {
      template: '<attend-main></attend-main>'
    })
    .when('/people', {
      template: '<people></people>'
    })
    .when('/person/new', {
      template: '<new-person></new-person>'
    })
    .otherwise({
      redirectTo: '/'
    })
  })
