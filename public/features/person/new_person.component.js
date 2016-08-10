angular.module('adminApp')
  .component('newPerson', {
    templateUrl: 'features/person/new_person.template.html',
    controller: function ($http) {
      this.newPerson = () => {
        $http({
          url: 'http://localhost:3000/person/new',
          method: 'POST',
          data: {
            name: this.name
          }
        }).then((res) => {
          console.log('CREATED!')
        }, (err) => {
          console.log('FAILED!', err)
        })
      }
    }
  })
