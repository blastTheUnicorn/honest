angular.module('honestApp', [
  'ngMaterial', 
  'ui.router',
  'LoginController',
  'SingUpController',
  'LostFoundController',
  'HomeController',
  'FormController',
  'ColorsController',
  'MainController',
  'ngAnimate'])

.config( function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/login')
  $stateProvider
  .state('login', {
    url: '/login',
    views: {
      header: { 
        templateUrl: '../templates/login/login-header.html'
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
        templateUrl: '../templates/headers/main-header.html',
        controller: 'MainCtrl' 
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
  .state('form.colors', {
    url: '/colors',
    templateUrl: '../templates/form/form-colors.html',
    controller: 'ColorsCtrl'
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
        templateUrl: '../templates/login/login-header.html'
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
      // console.log(token)
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > 0 ;
    }else{
      return false;
    }
  };

  logOut = function(){
    $window.localStorage.removeItem('Login-setup');
    $location.path('/login')
  };

  currentUser = function(){
    console.log("Testing", isLoggedIn() );
    if(isLoggedIn()){
      var token = getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      console.log("Testing", payload);
      return payload._id;
    }
  };
  return{
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    logOut : logOut,
    currentUser : currentUser
  }
})
