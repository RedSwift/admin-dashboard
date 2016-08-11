/* globals angular alert */
angular.module('adminApp')
  .component('editAttend', {
    templateUrl: 'features/attendance/edit_attend.template.html',
    controller: function ($http, $window, $routeParams) {
      $http({
        url: '/api/attendance/' + $routeParams.id,
        method: 'GET',
        headers: {
          email: $window.localStorage.email,
          auth_token: $window.localStorage.auth_token
        }
      }).then((res) => {
        this.attend = res.data
        console.log(res.data)
      }, (err) => {
        if (err) alert('Error connecting to server')
      })
    }
  })
