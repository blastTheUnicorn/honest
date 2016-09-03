angular.module('FeedController', [])

.controller('FeedCtrl', function($scope, Token, $http, $mdDialog){

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