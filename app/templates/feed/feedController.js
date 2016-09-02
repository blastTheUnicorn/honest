angular.module('FeedController', [])

.controller('FeedCtrl', function($scope, Token, $http){

  $scope.found = [];
  $scope.lost = [];
  $scope.match = true;

  $scope.console = function(){
    var userID = Token.currentUser()
    return $http.get('/api/user/' + userID + '/obj').success(function(data){
       $scope.lost = data.local.lost;
       $scope.found = data.local.found;
    })
  }();

  $scope.resolve = function(){
    console.log("call resolve function");
    //function that will delete(or move) the lost/found object
  };

  $scope.edit = function(){
    console.log('call edit function')
    /* return $http.put() */;
  };

})
