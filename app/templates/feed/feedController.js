angular.module('FeedController', [])

.controller('FeedCtrl', function($scope, Token, $http, $mdDialog, MatchData, $timeout){

  $scope.found = [];
  $scope.lost = [];
  $scope.match = true;
  $scope.possibleMatch = []
  $scope.lastElement

  $scope.console = function(){
    var userID = Token.currentUser()
    return $http.get('/api/user/' + userID + '/obj').success(function(data){
       $scope.lost = data.local.lost;
       $scope.found = data.local.found;

       if(data.local.lost.length > 0){
          $scope.lastElement = data.local.lost[0]
       }else{
          $scope.lastElement = data.local.found[0]
       }
    })
  }();

    $scope.getUser = function(index ,userID){
    return $http.get('/api/'+ userID).success(function(data){
       $scope.possibleMatch[index]._user = data
    })
  }

  $scope.match = function(){
        return $http.post('/api/match', $scope.lastElement).success(function(data){
          $scope.possibleMatch = data
          for (var i = 0; i < $scope.possibleMatch.length; i++) {
      $scope.possibleMatch[i]._user = $scope.getUser( i ,$scope.possibleMatch[i]._user)
    }
    $scope.match = false
        }).error(function(err){
          console.log(err);
        })
  }

  $timeout($scope.match, 2000)

  $scope.resolve = function(item){

    var confirm = $mdDialog.confirm()
    .title('once resolved you are not going to be able to see this item')
    .textContent('Are you sure?')
    .ok('Yes, Resolve')
    .cancel('No');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'Yes';
        if(item.lostOrFound === 'lost'){
          var i = $scope.lost.indexOf(item)
          $scope.lost.splice(i, 1)
        }else{
          var i = $scope.found.indexOf(item)
          $scope.found.splice(i, 1)
        }
        return $http.get('/api/obj/'+ item._id).success(function(data){
          console.log(data)
        }).error(function(err){
          console.log(err);
        })
    }, function() {
      $scope.status = 'No';

    });
  };

  $scope.openForm = function(MatchUser){
    MatchData.saveUser(MatchUser);
     $mdDialog.show({
      controller: 'EmailFormCtrl',
      templateUrl: 'templates/emailForm/form.tmpl.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
  }




})


// findLocation: function(req, res, next) {
//     var limit = req.query.limit || 10;

//     // get the max distance or set it to 8 kilometers
//     var maxDistance = req.query.distance || 8;

//     // we need to convert the distance to radians
//     // the raduis of Earth is approximately 6371 kilometers
//     maxDistance /= 6371;

//     // get coordinates [ <longitude> , <latitude> ]
//     var coords = [];
//     coords[0] = req.query.longitude;
//     coords[1] = req.query.latitude;

//     // find a location
//     Location.find({
//       loc: {
//         $near: coords,
//         $maxDistance: maxDistance
//       }
//     }).limit(limit).exec(function(err, locations) {
//       if (err) {
//         return res.json(500, err);
//       }

//       res.json(200, locations);
//     });
// }
