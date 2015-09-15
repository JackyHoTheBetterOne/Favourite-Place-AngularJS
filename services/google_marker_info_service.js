placeApp.service('googleMarkerInfo', [
'$resource',
function($resource) {
  var self = this;

  self.getMarkerInfo = function(obj) {
    var
      service = new google.maps.places.PlacesService(obj['map']),
      infoWindow = new google.maps.InfoWindow();
    service.getDetails(obj['place'], function(result, status) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      infoWindow.setContent(result.name);
      infoWindow.open(obj['map'], obj['marker']);
    });
  }
}]);
