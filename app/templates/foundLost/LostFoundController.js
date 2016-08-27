angular.module('LostFoundController', []).controller('LostFoundCtrl', function($timeout, $scope, $location, $http, Token){

$scope.loadItems = function() {
    // Use timeout to simulate a 650ms request.
    return $timeout(function() {
      $scope.items =  $scope.items  || [
        { id: 1, name: 'Wallet' },
        { id: 2, name: 'Glasses' },
        { id: 3, name: 'Jewelry' },
        { id: 4, name: 'Clothing' },
        { id: 5, name: 'Bag/Backpack' }
      ];
    }, 650);
  };

})