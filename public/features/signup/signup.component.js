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
            url: '/api/signup',
            method: 'POST',
            data: {
              name: this.name,
              email: this.email,
              password: this.password
            }
          }).then(function (res) {
            $window.location.href = '/#/login'
          }, function (err) {
            console.log('error', err)
          })
        }
      }
    }
  })
