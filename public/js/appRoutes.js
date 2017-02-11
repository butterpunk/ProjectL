angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'NerdController'
		})

		.when('/map', {
			templateUrl: 'views/nerd.html',
			controller: 'MainController'
		})

		.when('/property-profile', {
			templateUrl: 'views/property.html',
			controller: 'PropertyController'
		})

		.when('/profile', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		});
		/*
		.when('/auth/facebook', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		});*/

	//$locationProvider.html5Mode(true);

}]);