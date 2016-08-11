/* globals angular alert */
angular.module('adminApp')
  .component('personAttend', {
    templateUrl: 'features/person/person_attend.template.html',
    controller: function ($http, $window, $routeParams) {
      $http({
        url: '/api/attendance/person/' + $routeParams.id,
        method: 'GET',
        headers: {
          email: $window.localStorage.email,
          auth_token: $window.localStorage.auth_token
        }
      }).then((res) => {
        this.person = res.data
        console.log(res.data)
      }, (err) => {
        if (err) alert('Error connecting to server')
      })
    }
  })
