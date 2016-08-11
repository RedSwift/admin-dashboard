angular.module('adminApp')
  .component('login', {
    templateUrl: 'features/login/login.template.html',
    controller: function ($scope, $http, $window) {
      var userEmail
      this.login = function () {
        userEmail = this.email
        $http({
          url: '/api/login',
          method: 'POST',
          data: {
            email: this.email,
            password: this.password
          }
        }).then(function (res) {
          $window.localStorage.email = userEmail
          $window.localStorage.auth_token = res.data.auth_token
          $window.location.href = '/#/home'
        }, function (err) {
          console.log('error', err)
        })
      }
    }
  })
