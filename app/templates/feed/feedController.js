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
       console.log("Testing", $scope.found);
    })
  }();

  $scope.resolve = function(){
    console.log("call resolve function");
    //function that will delete(or move) the lost/found object
  };


})
