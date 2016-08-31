angular.module('LostFoundController', []).controller('LostFoundCtrl', function($timeout, $scope, $location, $http, Token){

      $scope.items =  $scope.items  || [
        { id: 1, name: 'Cellphone' },
        { id: 2, name: 'ID/Personal ID Cards' },
        { id: 3, name: 'Cash' },
        { id: 4, name: 'Debit/Credit Cards' },
        { id: 5, name: 'Bags/Purses' },
        { id: 6, name: 'Books' },
        { id: 7, name: 'Luggage/Totes' },
        { id: 8, name: 'Clothing/Hats/Gloves' },
        { id: 9, name: 'Documents' },
        { id: 10, name: 'Glasses' },
        { id: 11, name: 'Other' }
      ];

})