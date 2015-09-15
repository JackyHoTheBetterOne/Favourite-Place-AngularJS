placeApp.service('googlePlace', [
'$resource',
function($resource) {
  var self = this;

  self.getPlaces = function (obj) {
    var
      googleAPI = $resource(
        "https://maps.googleapis.com/maps/api/place/radarsearch/json",
        {}, {get: {method: 'GET'}}
      ),
      service = new google.maps.places.PlacesService(obj["map"]),
      request = {
        bounds: obj['bounds'],
        keyword: obj["keyword"]
      };
    if (obj["keyword"].length === 0) {
      var data = [];
      obj["callback"](data);
      return data;
    } else {
      return service.radarSearch(request, obj['callback']);
    }
  }
}]);
