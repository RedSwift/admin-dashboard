/* globals angular alert */
angular.module('adminApp')
  .component('attendOverall', {
    templateUrl: 'features/attendance/attend_overall.template.html',
    controller: function ($http, $window) {
      $http({
        method: 'GET',
        url: '/api/attendance',
        headers: {
          email: $window.localStorage.email,
          auth_token: $window.localStorage.auth_token
        }
      }).then((res) => {
        this.attend = res.data
      }, (err) => {
        if (err) alert('Error connecting to server')
      })
      this.deleteAttend = (id) => {
        $http({
          url: '/api/attendance/' + id,
          method: 'DELETE',
          headers: {
            email: $window.localStorage.email,
            auth_token: $window.localStorage.auth_token
          }
        }).then((res) => {
          $window.location.reload()
        }, (err) => {
          if (err) alert('Error connecting to server')
        })
      }
    }
  })
