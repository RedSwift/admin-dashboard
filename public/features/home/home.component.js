/* globals angular*/
angular.module('adminApp')
  .component('home', {
    templateUrl: '/features/home/home.template.html',
    controller: function ($window) {
      if (!$window.localStorage.email || !$window.localStorage.auth_token) $window.location.href = '/#/'
    }
  })
