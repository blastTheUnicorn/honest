angular.module("honestApp", ['ngMaterial', 'ui.router'])

.config( function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login')
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home/home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login/login.html'
    });
})
.controller('homeCtrl', ['$scope', function($scope){
  $scope.test = 'hello from controller';
}])