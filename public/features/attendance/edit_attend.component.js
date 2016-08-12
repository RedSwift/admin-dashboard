/* globals angular alert */
angular.module('adminApp')
  .component('editAttend', {
    templateUrl: 'features/attendance/edit_attend.template.html',
    controller: function ($http, $window, $routeParams) {
      if (!$window.localStorage.email || !$window.localStorage.auth_token) $window.location.href = '/#/'
      this.specialValue = 'Yes'
      $http({
        url: '/api/attendance/' + $routeParams.id,
        method: 'GET',
        headers: {
          email: $window.localStorage.email,
          auth_token: $window.localStorage.auth_token
        }
      }).then((res) => {
        this.attend = res.data
      }, (err) => {
        if (err) alert('Error connecting to server')
      })
      this.editAttend = () => {
        $http({
          url: '/api/attendance/' + $routeParams.id,
          method: 'PUT',
          headers: {
            email: $window.localStorage.email,
            auth_token: $window.localStorage.auth_token
          },
          data: {
            date: this.attend.date,
            people: this.attend.people
          }
        }).then((res) => {
          $window.location.reload()
        }, (err) => {
          if (err) alert('Error connecting to server')
        })
      }
    }
  })
