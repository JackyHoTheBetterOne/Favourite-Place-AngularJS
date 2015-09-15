placeApp.service('googleAddMarker', [
'$resource',
function($resource) {
  var self = this;

  self.addMarker = function(obj) {
    var
      marker = new google.maps.Marker({
        map: obj['map'],
        position: obj['location'],
        icon: {
          url: 'http://maps.gstatic.com/mapfiles/circle.png',
          anchor: new google.maps.Point(10, 10),
          scaledSize: new google.maps.Size(10, 17)
        }
      }),
      callback = obj['callback'] || function(){};
    callback(marker);
    return marker;
  }
}]);
