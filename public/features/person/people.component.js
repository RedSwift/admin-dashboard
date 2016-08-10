/* globals angular alert */
angular.module('adminApp')
  .component('people', {
    templateUrl: 'features/person/people.template.html',
    controller: function ($http, $window) {
      $http({
        url: 'http://localhost:3000/api/people',
        method: 'GET'
      }).then((res) => {
        this.people = res.data
      }, (err) => {
        if (err) alert(`error: unable to connect to server`)
      })
      this.deletePerson = (id) => {
        $http({
          url: 'http://localhost:3000/api/person/' + id,
          method: 'DELETE'
        }).then((res) => {
          console.log('success!')
          $window.location.reload()
        }, (err) => {
          if (err) alert('Error connecting to server')
        })
      }
    }
  })
