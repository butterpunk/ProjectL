 angular.module('MainCtrl', ['uiGmapgoogle-maps','angulartics','angulartics.google.analytics'])
.config(
	['$provide', 'nemSimpleLoggerProvider', 'uiGmapGoogleMapApiProvider', function($provide, nemSimpleLoggerProvider, uiGmapGoogleMapApiProvider) {
		$provide.decorator.apply(null, nemSimpleLoggerProvider.decorator);
		   //this loads gmaps api 
		   uiGmapGoogleMapApiProvider.configure({
	        key: 'AIzaSyCCFTekcXn3C9VY94-eqsYjRuecuSiRhHc', //I got a different API toke
	        libraries: 'weather,geometry,visualization'
	    });
}])
.controller('MainController', function($scope, $log, uiGmapGoogleMapApi, Nerd, $http,$location,$q) {
	$scope.map = { 
	    center: { 
			latitude: 29.937972,
			longitude: -90.07424999999999
	    }, 
	    zoom: 12 
	 };
	Nerd.getAllProperty().then(function(res){
		$scope.marker = [];
		if(res.data){
			angular.forEach(res.data,function(value,key,callback){
				  var address = value.address.replace(/ /g, '+');
				  $http({
				    method: 'GET',
				    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address
				  	})
				  	.then(function(res){
				    	var lat = res.data.results[0].geometry.location.lat;
				    	var lng = res.data.results[0].geometry.location.lng;
				      	var location = {
				          		'latitude': lat,
				          		'longitude': lng
				      	};
						var temp= {
							id: key,
							coords: location
						};
						$scope.marker.push(temp);
						console.log($scope.marker);
				  }); 
			});
		}
	});		
});