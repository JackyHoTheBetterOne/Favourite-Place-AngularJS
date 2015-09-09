placeApp.service('googleLocation', [
'$resource',
function($resource){
  var self = this;

  self.getLocationObj = function (location, success_callback) {
    var googleAPI = $resource(
      "https://maps.google.com/maps/api/geocode/json",
      {}, {get: {method: "GET"}}
    );

    return googleAPI.get({sensor: false, address: location}, success_callback);
  }
}]);

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
