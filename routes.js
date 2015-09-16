placeApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: "pages/home.html",
    controller: 'homeController'
  })
  .when('/place/:location_address/:place_id', {
    templateUrl: 'pages/place.html',
    controller: 'placeController'
  })
})
