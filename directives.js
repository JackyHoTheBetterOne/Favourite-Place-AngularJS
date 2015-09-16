placeApp.directive('placeDetail', function(){
  return {
    restrict: 'E',
    templateUrl: 'directives/placeDetail',
    replace: true,
    scope: {
      place: "=",
      removePlace: "&"
    }
  }
})

placeApp.directive('yelpDetail', function (){
  return {
    restrict: 'E',
    templateUrl: 'directives/yelpDetail',
    replace: true,
    scope: {
      yelppy: '='
    }
  }
})
