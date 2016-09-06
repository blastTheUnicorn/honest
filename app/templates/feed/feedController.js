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