placeApp.service('yelpApiCallService', [
'$resource',
function($resource) {
  var
    self = this,
    apiUrl = "http://localhost:3000/api/yelp_search";

  self.getYelpInfo = function (searchParams,
  successCallback, errorCallback) {
    var yelpAPI = $resource(
      apiUrl, {}, {get: {method: 'GET'}}
    )

    return yelpAPI.get(searchParams,
      successCallback, errorCallback);
  }
}])
