angular.module('adminApp')
  .component('attendMain', {
    templateUrl: 'features/attendance/attend_main.template.html',
    controller: function ($http, $window, $scope) {
      if (!$window.localStorage.email || !$window.localStorage.auth_token) $window.location.href = '/#/'
      this.notes = ''
      $http({
        method: 'GET',
        url: '/api/people',
        headers: {
          email: $window.localStorage.email,
          auth_token: $window.localStorage.auth_token
        }
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
          url: '/api/attendance/new',
          headers: {
            email: $window.localStorage.email,
            auth_token: $window.localStorage.auth_token
          },
          data: {
            date: this.date,
            people: this.allPeople
          }
        }).then((res) => {
          console.log('submitted')
          $window.location.href = '/#/attendance/overall'
        }, (err) => {
          console.log(err)
        })
      }
    }
  })
