angular.module("honestApp", ['ngMaterial', 'ui.router', 'LoginController'])

.config( function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login')
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home/home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login/login.html',
      controller: 'LoginCtrl'
    });
})
.controller('homeCtrl', ['$scope', function($scope){
  $scope.test = 'hello from controller';
}])