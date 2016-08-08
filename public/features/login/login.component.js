angular.module('adminApp')
  .component('login', {
    templateUrl: 'features/login/login.template.html',
    controller: function ($scope, $http, $window) {
      this.login = function () {
        $http({
          url: 'http://localhost:3000/login',
          method: 'POST',
          data: {
            email: this.email,
            password: this.password
          }
        }).then(function (res) {
          $window.location.href = 'http://localhost:3000/#/home'
        }, function (err) {
          console.log('error', err)
        })
      }
    }
  })
