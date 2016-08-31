angular.module('ColorsController', [])
  .controller('ColorsCtrl', function ($timeout, $q, $scope){

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
  $scope.subColors = [
    { category: 'sub', name: 'White '},
    { category: 'sub', name: 'Black '},
    { category: 'sub', name: 'Red '},
    { category: 'sub', name: 'Orange '},
    { category: 'sub', name: 'Yellow '},
    { category: 'sub', name: 'Green '},
    { category: 'sub', name: 'Blue '},
    { category: 'sub', name: 'Purple '},
    { category: 'sub', name: 'Gray '}
  ];

  $scope.selectedColors = [];
  $scope.printSelectedColors = function printSelectedColors() {
    var numberOfColors = this.selectedColors.length;
    // If there is more than one color, we add an 'and'
    // to be gramatically correct. If there are 3+ colors
    // we also add an oxford comma.
    if (numberOfColors > 1) {
      var needsOxfordComma = numberOfColors > 2;
      var lastColorConjunction = (needsOxfordComma ? ',' : '') + ' and ';
      var lastColor = lastColorConjunction +
          this.selectedColors[this.selectedColors.length - 1];
      return this.selectedColors.slice(0, -1).join(', ') + lastColor;
    }
    return this.selectedColors.join('');
  };
   
});