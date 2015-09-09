placeApp.controller('placeController',
['$scope', 'locationService', 'googleStreetView',
'$location', 'locationObjStorageService', '$window',
function ($scope, locationService, googleStreetView,
$location, locationObjStorageService, $window) {
  var
    streetViewDivId = 'street-view-canvas',
    markerPosition = locationService.marker.position;


  function isAreaNotOnRecord (type, name) {
    var string = locationObjStorageService.getRecordString(type);

    return string.indexOf(name) === -1 ? true : false;
  }

  $scope.place = googleStreetView.getStreetView({
    view_id: streetViewDivId,
    lat: markerPosition.G,
    lng: markerPosition.K
  });

  $scope.locationArr = locationObjStorageService.locationArr;
  $scope.placeObj = locationService.placeObj;

  $scope.addPlace = function () {
    var
      locationObj = locationService.locationObj,
      name = locationObj.address_components[0].long_name,
      address = location.formatted_address,
      placeObj = $scope.placeObj,
      placeName = placeObj.name;

    if (isAreaNotOnRecord("location", name)) {
      var locationObjLocal = new Location(name, address, locationObj);
      $scope.locationArr.push(
        locationObjLocal
      );
    } else {
      var locationObj = locationObjStorageService.
        getLocation(address);
    }

    locationObj.addPlace(
      new Place(placeName, placeObj)
    );
  }

  $scope.isCurrentPlaceNotOnRecord = function () {
    var name = $scope.placeObj.name;

    return isAreaNotOnRecord("place", name);
  }

  $scope.backToHome = function () {
    $location.path('/');
  }

  $scope.$watch('locationArr', function(){
    locationObjStorageService.locationArr = $scope.locationArr;
    $window.localStorage.locationStorage = JSON.stringify($scope.locationArr);
  });
}]);
