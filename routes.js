placeApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: "pages/home.html",
    controller: 'homeController'
  })
  .when('/place', {
    templateUrl: 'pages/place.html',
    controller: 'placeController'
  })
})
