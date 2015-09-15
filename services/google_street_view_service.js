placeApp.service('googleStreetView', [
'$resource',
function($resource) {
  var self = this;

  self.getStreetView = function (obj) {
    var
      place = new google.maps.LatLng(obj.lat, obj.lng),
      element = document.getElementById(obj["view_id"]),
      panoramaOptions = {
        position: place,
        pov: {
          heading: 34,
          pitch: 10
        }
      };

    return element ? new google.maps.StreetViewPanorama(
      element, panoramaOptions) : {};
  }
}]);
