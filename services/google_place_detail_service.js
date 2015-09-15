placeApp.service('googlePlaceDetail', [
'$resource',
function($resource) {
  var self = this;

  self.getPlaceDetail = function (map, placeId, callback) {
    var service = new google.maps.places.PlacesService(map);

    return service.getDetails({
      placeId: placeId
    }, callback);
  }
}]);
