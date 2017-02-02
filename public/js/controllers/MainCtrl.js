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
.controller('MainController', function($scope, $log, uiGmapGoogleMapApi, Nerd, $http) {
		Nerd.getVerify().then(function(res){
		console.log(res);
		if(res.data.message == "NO"){
			$location.path("/");
		}else{

		}
	});
});