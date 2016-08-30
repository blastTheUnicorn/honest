angular.module('honestApp', [
  'ngMaterial', 
  'ui.router',
  'LoginController',
  'SingUpController',
  'LostFoundController',
  'HomeController',
  'FormController',
  'ngAnimate'])

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
  
  // Begin the lost and found form here.
  .state('form', {
    url: '/form',
    views: {
      header: {
        templateUrl: '../templates/headers/main-header.html'
      },
      container: {
        templateUrl: '../templates/form/form.html',
        controller: 'FormCtrl'
      }
    }
  })
  .state('form.location', {
    url: '/location',
    templateUrl: '../templates/home/home.html',
    controller: 'HomeCtrl'

  })
  .state('form.itemType', {
      url: '/item-type',
      templateUrl: '../templates/form/form-type.html',
      controller: 'LostFoundCtrl'
  })
  .state('form.description', {
    url: '/description',
    templateUrl: '../templates/form/form-description.html'
  })
  // End lost and found form here.

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
