placeApp.service('placeStorageActionService', [
'$localStorage', 'locationObjStorageService', 'modelService',
function($localStorage, locationObjStorageService, modelService) {
  var self = this;

  self.addLocation = function (locationObj) {
    var
      name = locationObj.address_components[0].long_name,
      address = locationObj.formatted_address;

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

    return locationObjLocal;
  }


  self.addPlace = function (locationObj, placeObj) {
    var
      placeObj = placeObj,
      placeAddress = placeObj.formatted_address,
      placeName = placeObj.name,
      locationObjLocal = self.addLocation(locationObj);

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

  self.removePlace = function (location, place) {
    location.removePlace(place);
  }
}]);
