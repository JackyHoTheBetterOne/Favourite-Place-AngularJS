placeApp.service('googleStreetView', [
'$resource',
function($resource) {
  var self = this;

  self.getStreetView = function (obj) {
    var
      place = new google.maps.LatLng(obj.lat, obj.lng),
      panoramaOptions = {
        position: place,
        pov: {
          heading: 34,
          pitch: 10
        }
      };

    return new google.maps.StreetViewPanorama(
      document.getElementById(obj["view_id"]),
      panoramaOptions);
  }
}]);
