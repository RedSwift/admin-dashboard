/* globals angular alert */
angular.module('adminApp')
  .component('editPerson', {
    templateUrl: 'features/person/edit_person.template.html',
    controller: function ($http, $routeParams, $window) {
      if (!$window.localStorage.email || !$window.localStorage.auth_token) $window.location.href = '/#/'
      $http({
        url: '/api/person/' + $routeParams.id,
        method: 'GET',
        headers: {
          email: $window.localStorage.email,
          auth_token: $window.localStorage.auth_token
        }
      }).then((res) => {
        this.newName = res.data.name
      }, (err) => {
        if (err) alert('Error connecting to server')
      })

      this.editPerson = function () {
        $http({
          url: '/api/person/' + $routeParams.id,
          method: 'PUT',
          headers: {
            email: $window.localStorage.email,
            auth_token: $window.localStorage.auth_token
          },
          data: {
            name: this.newName
          }
        }).then((res) => {
          $window.location.href = '/#/people'
        }, (err) => {
          if (err) alert('Error in connecting to server')
        })
      }
    }
  })
