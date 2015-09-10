placeApp.directive('placeDetail', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/placeDetail',
    replace: true,
    scope: {
      place: "=",
    }
  }
})
