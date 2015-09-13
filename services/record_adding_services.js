placeApp.service('placeAddingService', [
'$localStorage', 'locationObjStorageService',
'locationService', 'modelService',
function($localStorage, locationObjStorageService,
locationService, modelService) {
  var self = this;

  self.addPlace = function (locationObj, placeObj) {
    var
      name = locationObj.address_components[0].long_name,
      address = locationObj.formatted_address,
      placeObj = placeObj,
      placeAddress = placeObj.formatted_address,
      placeName = placeObj.name;

    if (locationObjStorageService.isAreaNotOnRecord("location", address)) {
      var locationObjLocal = modelService.newLocation(
        {
          name: name,
          address: address,
          locationObj: locationObj
        }
      );
      locationObjStorageService.locationArr.push(
        locationObjLocal
      );
    } else {
      var locationObjLocal = locationObjStorageService.
        getLocation(address);
    }

    locationObjLocal.addPlace(
      modelService.newPlace({
        name: placeName,
        address: placeAddress,
        placeObj: placeObj
      })
    );

    return $localStorage.locationStorage =
      JSON.stringify(locationObjStorageService.locationArr);
  }
}]);
