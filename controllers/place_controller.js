placeApp.controller('placeController',
['$scope', 'locationService', 'googleStreetView',
'$location', 'locationObjStorageService', '$window',
'placeStorageActionService',
function ($scope, locationService, googleStreetView,
$location, locationObjStorageService, $window,
placeStorageActionService) {
  var
    streetViewDivId = 'street-view-canvas',
    markerPosition = locationService.marker.position;


  $scope.locationArr = locationObjStorageService.locationArr;
  $scope.placeObj = locationService.placeObj;

  $scope.initStreetView = function () {
    return (function (scope) {
      scope.place = googleStreetView.getStreetView({
        view_id: streetViewDivId,
        lat: markerPosition.G,
        lng: markerPosition.K
      });
    })($scope);
  }



  $scope.addPlace = function () {
    return (function(scope) {
      $scope.locationArr = placeStorageActionService.addPlace(
        locationService.locationObj,
        $scope.placeObj
      );
    })($scope);
  }

  $scope.isCurrentPlaceNotOnRecord = function () {
    var name = $scope.placeObj.name;

    return locationObjStorageService.isAreaNotOnRecord("place", name);
  }

  $scope.backToHome = function () {
    $location.path('/');
  }
}]);
