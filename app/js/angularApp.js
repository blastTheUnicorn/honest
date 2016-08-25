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

.factory('Token', function($window, $location){

  saveToken = function(token){
    $window.localStorage['Login-setup'] = token;
  };

  getToken = function(){
    return $window.localStorage['Login-setup']
  };

  isLoggedIn = function(){
    var token = getToken();
    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }else{
      return false;
    }
  };

  logOut = function(){
    $window.localStorage.removeItem('Login-setup');
    $location.path('/login')
  };

  return{
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    logOut : logOut
  }
})
