angular.module('FeedController', [])

.controller('FeedCtrl', function($scope, Token, $http, $mdDialog){

  $scope.found = [];
  $scope.lost = [];
  $scope.match = true;
  $scope.possibleMatch = [{ _id: '57cf7991c532615c23db1b76',
    comments: 'lrksgkhjkre',
    keyWords: 'White',
    category: 'Cellphone',
    geo: [ -122.4020293, 37.7905236 ],
    lostOrFound: 'lost',
    _user: '57c873646cc93e5a2dbbf3c9',
    __v: 0 },
  { _id: '57d07e06172947fe291b6100',
    comments: 'mnbhgh',
    keyWords: 'White',
    category: 'Cellphone',
    geo: [ -122.40205429999999, 37.7904945 ],
    lostOrFound: 'lost',
    _user: '57c873646cc93e5a2dbbf3c9',
    __v: 0 }]

  $scope.showMatch = function(){
      console.log("Testing");
      $scope.match = false;
  };

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

  $scope.openForm = function(){
     $mdDialog.show({
      controller: 'EmailFormCtrl',
      templateUrl: 'templates/emailForm/form.tmpl.html',
      parent: angular.element(document.body),
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
  }

  $scope.user = function(userID){
    return $http.get('/api/'+ userID).success(function(data){
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
