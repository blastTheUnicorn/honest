angular.module('ColorsController', [])

.controller('ColorsCtrl', function ($timeout, $q, $scope){
  $scope.selectedColors = [];
  $scope.colors = [
    { category: 'main', name: 'White'},
    { category: 'main', name: 'Black'},
    { category: 'main', name: 'Red'},
    { category: 'main', name: 'Orange'},
    { category: 'main', name: 'Yellow'},
    { category: 'main', name: 'Green'},
    { category: 'main', name: 'Blue'},
    { category: 'main', name: 'Purple'},
    { category: 'main', name: 'Gray'}
  ];


  $scope.printSelectedColors = function printSelectedColors() {
    var numberOfColors = this.selectedColors.length;
    if (numberOfColors > 1) {
      var needsOxfordComma = numberOfColors > 2;
      var lastColorConjunction = (needsOxfordComma ? ',' : '') + ' and ';
      var lastColor = lastColorConjunction + this.selectedColors[this.selectedColors.length - 1];
      return this.selectedColors.slice(0, -1).join(', ') + lastColor;
    }
    return this.selectedColors.join('');
  };
   
});
