placeApp.controller('placeController',
['$scope', 'googleStreetView', '$routeParams',
'$location', 'locationObjStorageService', '$window',
'placeStorageActionService', 'yelpApiCallService',
'googlePlaceDetail', 'googleLocation', 'googleMap',
function ($scope, googleStreetView, $routeParams,
$location, locationObjStorageService, $window,
placeStorageActionService, yelpApiCallService,
googlePlaceDetail, googleLocation, googleMap) {
  var
    streetViewDivId = 'street-view-canvas',
    hiddenMapId = "map";

  $scope.locationArr = locationObjStorageService.locationArr;

  function initFunctions () {
    return (function (scope) {
      (scope.initYelpInfo = function () {
        return (function (scope) {
          var searchParams = {
            location: scope.locationObj.
              formatted_address,
            limit: 1,
            term: scope.placeObj.name
          };

          yelpApiCallService.getYelpInfo(
            searchParams,
            function (response) {
              scope.yelpObj = $window.yelp = response;
            },
            function (response) {
              console.log(response);
            }
          );
        })($scope);
      })();

      scope.initStreetView = function () {
        var location = $scope.placeObj.geometry.location;

        return (function (scope) {
          scope.streetView = googleStreetView.getStreetView({
            view_id: streetViewDivId,
            lat: location.H,
            lng: location.L
          });
        })($scope);
      };

      scope.isCurrentPlaceNotOnRecord = function () {
        var name = $scope.placeObj.name;

        return locationObjStorageService.isAreaNotOnRecord("place", name);
      };
    })($scope);
  }

  (function init (scope) {
    debugger;
    googleLocation.getLocationObj(
      decodeURIComponent($routeParams.location_address),
      function(data) {
        scope.locationObj = data.results[0];
        scope.currentMap = googleMap.getMap(
          scope.locationObj.geometry.location,
          hiddenMapId
        );
        googlePlaceDetail.getPlaceDetail(
          scope.currentMap, $routeParams.place_id,
          function (place, status) {
            scope.placeObj = place;
            initFunctions();
          }
        );
      }
    )
  })($scope);

  $scope.addPlace = function () {
    return (function(scope) {
      $scope.locationArr = placeStorageActionService.addPlace(
        $scope.locationObj,
        $scope.placeObj
      );
    })($scope);
  };

  $scope.backToHome = function () {
    $location.path('/');
  };
}]);
