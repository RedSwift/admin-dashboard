angular.module('adminApp')
  .component('signUp', {
    templateUrl: 'features/signup/signup.template.html',
    controller: function ($scope, $window, $http) {
      this.signup = function () {
        if (this.password !== this.confirm) {
          this.error = 'Password does not match!'
          return
        } else {
          $http({
            url: 'http://localhost:3000/signup',
            method: 'POST',
            data: {
              name: this.name,
              email: this.email,
              password: this.password,
              signup_token: this.token
            }
          }).then(function (res) {
            $window.location.href = 'http://localhost:3000/#/login'
          }, function (err) {
            console.log('error', err)
          })
        }
      }
    }
  })
