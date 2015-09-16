placeApp.controller('homeController',
['$scope', 'locationService', 'googleLocation', 'googleMap',
'googlePlace', 'googleAddMarker', 'googleMarkerInfo',
'googlePlaceDetail', '$location', 'locationObjStorageService',
'placeStorageActionService', "placeStorageActionService",
function($scope, locationService, googleLocation, googleMap,
googlePlace, googleAddMarker, googleMarkerInfo,
googlePlaceDetail, $location, locationObjStorageService,
placeStorageActionService, placeStorageActionService) {
  var mapID = "map-canvas";
  $scope.location = locationService.location;
  $scope.currentPlaceSearch = locationService.currentPlaceSearch;

  function addMarkers (places, map) {
    var arr = [];
    for(var i = 0; i<places.length; i++){
      var place = places[i];
      (function (place) {

        arr.push(googleAddMarker.addMarker({
          map: map,
          location: place.geometry.location,
          callback: function (marker) {
            google.maps.event.addListener(marker, 'click', function() {
              googleMarkerInfo.getMarkerInfo({
                map: map,
                place: place,
                marker: marker
              });
            });
            marker.addListener('dblclick', function () {
              var
                locationName = placeStorageActionService.addLocation(
                  $scope.locationArr[0]
                ).address,
                placeId = place.place_id,
                url = "/place/" + encodeURIComponent(locationName) +
                  "/" + placeId;
              debugger;
              $location.path(url);
              $scope.$apply();
            });
          }
        }));
      })(place);
    }
    return arr;
  }

  function removeMarkers (arr) {
    arr = arr || [];
    for (var i = 0; i < arr.length; i++ ) {
      arr[i].setMap(null);
    }
  }


  $scope.getPlaces = function () {
    return (function (scope) {
      if (typeof $scope.currentPlaceSearch !== "undefined") {
        var
          current_area_geo = scope.locationArr[0].geometry,
          current_map = scope.currentMap;
        scope.currentSearchObj = googlePlace.getPlaces({
          map: current_map,
          bounds: current_map.getBounds(),
          keyword: $scope.currentPlaceSearch,
          callback: function(data) {
            removeMarkers(scope.markers);
            scope.markers = addMarkers(data, current_map);
          }
        });
      }
    })($scope);
  };

  ($scope.submit = function () {
    return (function (scope) {
      googleLocation.getLocationObj(
        scope.location,
        function(data){
          scope.locationArr = data.results;
          scope.currentLocationName = scope.locationArr[0].
            address_components[0].long_name;
          scope.currentMap = googleMap.getMap(
            scope.locationArr[0].geometry.location,
            mapID
          );
          scope.getPlaces();
        }
      );
    })($scope);
  })();

  $scope.ifAnyFavouritePlace = function () {
    if (!$scope.locationArr) {
      return false;
    } else {
      var currentLocation = $scope.currentLocation;
      ;
      return Object.keys(currentLocation).length > 0 &&
        currentLocation.places.length > 0;
    }
  }

  $scope.removePlace = function (place) {
    placeStorageActionService.removePlace(
      $scope.currentLocation, place);
  }

  $scope.$watch('locationArr', function(){
    var results = $scope.locationArr || [];
    if (results.length !== 0) {
      var location = results[0];
      $scope.currentLocation = locationObjStorageService.
        getLocation(location.formatted_address);
    } else {
      $scope.currentLocation = {};
    }
  });

  $scope.$watch('location', function(){
    locationService.location = $scope.location;
  });

  $scope.$watch('currentPlaceSearch', function(){
    locationService.currentPlaceSearch = $scope.currentPlaceSearch;
  });
}]);
