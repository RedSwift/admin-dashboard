/* globals angular*/
angular.module('adminApp')
  .component('sideNav', {
    templateUrl: '/features/sidenav/sidenav.template.html',
    controller: function ($mdSidenav, $scope, $location, $window) {
      var contz = $location.absUrl().split('/')
      this.url = contz[4].toUpperCase()
      this.isSidenavOpen = false
      this.openLeftMenu = () => {
        $mdSidenav('left').toggle()
      }
      this.logout = () => {
        $window.localStorage.clear()
        $window.location.href = '/#/login'
      }
    }
  })
