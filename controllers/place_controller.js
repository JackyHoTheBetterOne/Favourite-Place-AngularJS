placeApp.controller('placeController',
['$scope', 'locationService', 'googleStreetView',
'$location', 'locationObjStorageService', '$window',
'placeAddingService',
function ($scope, locationService, googleStreetView,
$location, locationObjStorageService, $window,
placeAddingService) {
  var
    streetViewDivId = 'street-view-canvas',
    markerPosition = locationService.marker.position;

  $scope.place = googleStreetView.getStreetView({
    view_id: streetViewDivId,
    lat: markerPosition.G,
    lng: markerPosition.K
  });

  $scope.locationArr = locationObjStorageService.locationArr;
  $scope.placeObj = locationService.placeObj;

  $scope.addPlace = function () {
    return (function(scope) {
      $scope.locationArr = placeAddingService.addPlace(
        locationService.locationObj,
        $scope.placeObj
      );
    })($scope);
  }

  $scope.isCurrentPlaceNotOnRecord = function () {
    var name = $scope.placeObj.name;

    ;

    return locationObjStorageService.isAreaNotOnRecord("place", name);
  }

  $scope.backToHome = function () {
    $location.path('/');
  }
}]);
