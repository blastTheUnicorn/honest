angular.module("honestApp", ['ui.router'])

.config( function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/')
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '../templates/home/home.html'
    });
})
.controller('homeCtrl', ['$scope', function($scope){
  $scope.test = 'hello from controller';
}])