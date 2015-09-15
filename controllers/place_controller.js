placeApp.controller('placeController',
['$scope', 'locationService', 'googleStreetView',
'$location', 'locationObjStorageService', '$window',
'placeStorageActionService', 'yelpApiCallService',
function ($scope, locationService, googleStreetView,
$location, locationObjStorageService, $window,
placeStorageActionService, yelpApiCallService) {
  var
    streetViewDivId = 'street-view-canvas',
    markerPosition = locationService.marker.position;


  $scope.locationArr = locationObjStorageService.locationArr;
  $scope.placeObj = locationService.placeObj;

  $scope.initStreetView = function () {
    return (function (scope) {
      scope.place = googleStreetView.getStreetView({
        view_id: streetViewDivId,
        lat: markerPosition.G,
        lng: markerPosition.K
      });
    })($scope);
  }

  $scope.initYelpInfo = function () {
    return (function (scope) {
      var searchParams = {
        location: locationService.locationObj.
          formatted_address,
        limit: 1,
        term: locationService.placeObj.name
      };

      yelpApiCallService.getYelpInfo(
        searchParams,
        function (response) {
          $scope.yelpObj = response.businesses[0];
          console.log($scope.yelpObj);
        },
        function (response) {
          console.log(response);
        }
      );
    })($scope);
  }



  $scope.addPlace = function () {
    return (function(scope) {
      $scope.locationArr = placeStorageActionService.addPlace(
        locationService.locationObj,
        $scope.placeObj
      );
    })($scope);
  }

  $scope.isCurrentPlaceNotOnRecord = function () {
    var name = $scope.placeObj.name;

    return locationObjStorageService.isAreaNotOnRecord("place", name);
  }

  $scope.backToHome = function () {
    $location.path('/');
  }
}]);
