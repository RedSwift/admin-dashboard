/* globals angular alert */
angular.module('adminApp')
  .component('attendOverall', {
    templateUrl: 'features/attendance/attend_overall.template.html',
    controller: function ($http) {
      $http({
        method: 'GET',
        url: 'http://localhost:3000/api/attendance'
      }).then((res) => {
        this.attend = res.data
        console.log(res.data)
      }, (err) => {
        if (err) alert('Error connecting to server')
      })
    }
  })
