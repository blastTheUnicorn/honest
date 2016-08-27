angular.module('honestApp', [
  'ngMaterial', 
  'ui.router', 
  'LoginController',
  'SingUpController',
  'LostFoundController'])

.config( function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login')
  $stateProvider
  .state('login', {
    url: '/login',
    views: {
      header: { 
        templateUrl: '../templates/login/login-header.html' 
        // controller: 'loginHeaderController' 
      },
      container: { 
        templateUrl: '../templates/login/login-container.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('home', {
    url: '/home',
    views:{
      header: {
        templateUrl: '../templates/headers/main-header.html'
      },
      container: {
        templateUrl: '../templates/home/home.html'
      }
    }
  })
  .state('foundLost', {
    url: '/lost-found',
    views: {
      header: {
        templateUrl: '../templates/headers/main-header.html'
      },
      container: {
        templateUrl: '../templates/foundLost/found-lost.html',
        controller: 'LostFoundCtrl'
      }
    }
  })
  .state('signup', {
    url: '/signup',
    views: {
      header: {
        templateUrl: '../templates/headers/main-header.html'
      },
      container: {
        templateUrl: '../templates/signup/signup.html',
        controller: 'SignUpCtrl'
      }
    }
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
