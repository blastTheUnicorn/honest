angular.module('LostFoundController', []).controller('LostFoundCtrl', function($timeout, $scope, $location, $http, Token){

      $scope.items = [
        {name: 'Cellphone' },
        {name: 'ID/Personal ID Cards' },
        {name: 'Cash' },
        {name: 'Debit/Credit Cards' },
        {name: 'Bags/Purses' },
        {name: 'Books' },
        {name: 'Luggage/Totes' },
        {name: 'Clothing/Hats/Gloves' },
        {name: 'Documents' },
        {name: 'Glasses' },
        {name: 'Other' }
      ];

})
