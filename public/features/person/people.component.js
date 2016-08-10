/* globals angular alert */
angular.module('adminApp')
  .component('people', {
    templateUrl: 'features/person/people.template.html',
    controller: function ($http) {
      $http({
        url: 'http://localhost:3000/people',
        method: 'GET'
      }).then((res) => {
        this.people = res.data
      }, (err) => {
        if (err) alert(`error: unable to connect to server`)
      })
    }
  })
