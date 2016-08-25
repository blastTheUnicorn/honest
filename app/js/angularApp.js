angular.module("honestApp", [
  'ngMaterial', 
  'ui.router', 
  'LoginController',
  'SingUpController'])

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
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/templates/signup/signup.html',
      controller: 'SignUpCtrl'
    });
})
.controller('homeCtrl', ['$scope', function($scope){
  $scope.test = 'hello from controller';
}])