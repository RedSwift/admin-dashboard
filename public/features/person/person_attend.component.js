/* globals angular alert */
angular.module('adminApp')
  .component('personAttend', {
    templateUrl: 'features/person/person_attend.template.html',
    controller: function ($http, $window, $routeParams) {
      if (!$window.localStorage.email || !$window.localStorage.auth_token) $window.location.href = '/#/'
      $http({
        url: '/api/attendance/person/' + $routeParams.id,
        method: 'GET',
        headers: {
          email: $window.localStorage.email,
          auth_token: $window.localStorage.auth_token
        }
      }).then((res) => {
        this.person = res.data
      }, (err) => {
        if (err) alert('Error connecting to server')
      })
    }
  })
