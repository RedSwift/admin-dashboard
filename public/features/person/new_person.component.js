/* globals alert angular */
angular.module('adminApp')
  .component('newPerson', {
    templateUrl: 'features/person/new_person.template.html',
    controller: function ($http, $window) {
      this.newPerson = () => {
        $http({
          url: 'http://localhost:3000/api/person/new',
          method: 'POST',
          data: {
            name: this.name
          }
        }).then((res) => {
          $window.location.href = 'http://localhost:3000/#/people'
        }, (err) => {
          if (err) alert('error: unable to connect to server')
        })
      }
    }
  })
