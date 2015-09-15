placeApp.service('googleMap', [
'$resource',
function($resource){
  var self = this;

  self.getMap = function (location, id) {
    var mapOptions = {
      center: location,
      zoom: 12
    };
    return new google.maps.Map(document.getElementById(id), mapOptions);
  }
}]);
