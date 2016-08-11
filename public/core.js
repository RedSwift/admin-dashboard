/* globals angular */
angular.module('adminApp', ['ngMaterial', 'ngRoute'])
  .config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('brown')
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
    .when('/attendance/overall', {
      template: '<attend-overall></attend-overall>'
    })
    .when('/attendance/person/:id', {
      template: '<person-attend></person-attend>'
    })
    .when('/attendance/edit/:id', {
      template: '<edit-attend></edit-attend>'
    })
    .when('/people', {
      template: '<people></people>'
    })
    .when('/person/new', {
      template: '<new-person></new-person>'
    })
    .when('/person/edit/:id', {
      template: '<edit-person></edit-person>'
    })
    .otherwise({
      redirectTo: '/'
    })
  })
