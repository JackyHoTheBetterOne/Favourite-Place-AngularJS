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

placeApp.service('googleStreetView', [
'$resource',
function($resource) {
  var self = this;

  self.getStreetView = function (obj) {
    var
      place = new google.maps.LatLng(obj.lat, obj.lng);
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
