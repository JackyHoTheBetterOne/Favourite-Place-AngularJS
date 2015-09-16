placeApp.service('googleMarkerInfo', [
'$resource',
function($resource) {
  var self = this;

  self.getMarkerInfo = function(obj, callback) {
    var
      service = new google.maps.places.PlacesService(obj['map']),
      infoWindow = new google.maps.InfoWindow(),
      result;
    service.getDetails(obj['place'], function(response, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      result = response;
      infoWindow.setContent(result.name);
      infoWindow.open(obj['map'], obj['marker']);
    });

    return result;
  }
}]);
