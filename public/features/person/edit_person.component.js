/* globals angular alert */
angular.module('adminApp')
  .component('editPerson', {
    templateUrl: 'features/person/edit_person.template.html',
    controller: function ($http, $routeParams, $window) {
      this.editPerson = function () {
        $http({
          url: 'http://localhost:3000/api/person/' + $routeParams.id,
          method: 'PUT',
          data: {
            name: this.newName
          }
        }).then((res) => {
          $window.location.href = 'http://localhost:3000/#/people'
        }, (err) => {
          if (err) alert('Error in connecting to server')
        })
      }
    }
  })
