angular.module('FeedController', [])

.controller('FeedCtrl', function($scope, Token, $http){

  $scope.found = [];
  $scope.lost = [];

  $scope.console = function(){
    var userID = Token.currentUser()
    return $http.get('/api/user/' + userID + '/obj').success(function(data){
       $scope.lost = data.local.lost;
       $scope.found = data.local.found;
       console.log($scope.lost)
    })
  }();
})
