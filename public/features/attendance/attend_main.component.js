angular.module('adminApp')
  .component('attendMain', {
    templateUrl: 'features/attendance/attend_main.template.html',
    controller: function ($http, $window, $scope) {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/people'
      }).then((res) => {
        this.people = res.data
      })
      this.newAttend = () => {
        this.allPeople = []
        for (let i = 0; i < this.people.length; i++) {
          this.allPeople.push({
            name: this.people[i].name,
            score: this.score[i],
            notes: this.notes[i]
          })
        }
        $http({
          method: 'POST',
          url: 'http://localhost:3000/api/attendance/new',
          data: {
            date: this.date,
            people: this.allPeople
          }
        }).then((res) => {
          console.log('submitted')
          // $window.location.reload()
        }, (err) => {
          console.log(err)
        })
      }
    }
  })
