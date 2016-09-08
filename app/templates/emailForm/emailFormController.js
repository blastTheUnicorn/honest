angular.module('EmailFormController', [])

.controller('EmailFormCtrl', function($scope, Token, $mdDialog, $http, MatchData){
  $scope.message = {}

  $scope.sendEmail = function(){
    $scope.message.user = MatchData.getUser()
    console.log("Testing", $scope.message.text);
     var userID = Token.currentUser()
    return $http({
      method: 'POST',
      url: '/api/' + userID + '/send',
      contentType: 'application/json',
      data: $scope.message
    }).then(function successCallback(res){
      console.log("Testing", res);
      $mdDialog.hide()
      console.log("this works!!!!!!", $scope.message)
      return res;
    })

  }
})
