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
