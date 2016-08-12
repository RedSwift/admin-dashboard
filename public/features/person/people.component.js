/* globals angular alert */
angular.module('adminApp')
  .component('people', {
    templateUrl: 'features/person/people.template.html',
    controller: function ($http, $window, $scope) {
      if (!$window.localStorage.email || !$window.localStorage.auth_token) $window.location.href = '/#/'
      $http({
        url: '/api/people',
        method: 'GET',
        headers: {
          email: $window.localStorage.email,
          auth_token: $window.localStorage.auth_token
        }
      }).then((res) => {
        this.people = res.data
      }, (err) => {
        if (err) alert(`error: unable to connect to server`)
      })

      this.newPerson = () => {
        $http({
          url: '/api/person/new',
          method: 'POST',
          headers: {
            email: $window.localStorage.email,
            auth_token: $window.localStorage.auth_token
          },
          data: {
            name: this.name
          }
        }).then((res) => {
          this.people.push(res.data)
        })
      }

      this.deletePerson = (id) => {
        $http({
          url: '/api/person/' + id,
          method: 'DELETE',
          headers: {
            email: $window.localStorage.email,
            auth_token: $window.localStorage.auth_token
          }
        }).then((res) => {
          console.log('success!')
          $window.location.reload()
        }, (err) => {
          if (err) alert('Error connecting to server')
        })
      }
    }
  })
