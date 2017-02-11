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
.controller('MainController', function($scope, $log, uiGmapGoogleMapApi, Nerd, $http,$location) {
		 $scope.map = { 
		    center: { 
		      latitude: 45, 
		      longitude: -73 
		    }, 
		    zoom: 8 
		  };
		Nerd.getVerify().then(function(res){
			console.log(res);
			if(res.data.message == "NO"){
				$location.path("/");
			}else{	
				Nerd.getAllProperty().then(function(res){

					angular.forEach(res.data,function(value,key){
						geoCode(value.address);
					});
				});	
			}
		});
//////////Geocode address		
	var geoCode = function(address){
      // replace spaces with '+'
      address = address.replace(/ /g, '+');
      $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address
      	})
      	.then(function(res){
        	var lat = res.data.results[0].geometry.location.lat;
        	var lng = res.data.results[0].geometry.location.lng;
        	console.log('GETTING ADDRESS BACK:',lat,lng);
          	
          	$scope.map = { 
            	center: { 
              		latitude: lat, 
              		longitude: lng
            	}, 
            	zoom: 16
          	};
          	// format the object the way that $scope.marker expects it
          	$scope.marker = {
            	id: 0,
            	coords: {
              		latitude: lat,
              		longitude: lng
            	}
        	};
      }); 
	}
});