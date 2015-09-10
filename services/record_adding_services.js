placeApp.service('placeAddingService', [
'$localStorage', 'locationObjStorageService',
'locationService',
function($localStorage, locationObjStorageService,
locationService) {
  var self = this;

  self.addPlace = function (locationObj, placeObj) {
    var
      name = locationObj.address_components[0].long_name,
      address = locationObj.formatted_address,
      placeObj = placeObj,
      placeName = placeObj.name;

    if (locationObjStorageService.isAreaNotOnRecord("location", address)) {
      var locationObjLocal = new Location(name, address, locationObj);
      locationObjStorageService.locationArr.push(
        locationObjLocal
      );
    } else {
      var locationObjLocal = locationObjStorageService.
        getLocation(address);
    }

    locationObjLocal.addPlace(
      new Place(placeName, placeObj)
    );

    return $localStorage.locationStorage =
      JSON.stringify(locationObjStorageService.locationArr);
  }
}]);
