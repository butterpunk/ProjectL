angular.module('PropertyCtrl', []).controller('PropertyController', function($scope,$http, Nerd,$location) {
		$scope.property = {
			user_id: '',
			address: '',
			price: '',
			age: ''
		};
		console.log('hello');
		Nerd.getVerify().then(function(res){
			console.log(res);
			if(res.data.message == "NO"){
				$location.path("/");
			}else{
				$scope.property.user_id = res.data.user_id;
				Nerd.getProperty(res.data.user_id).then(function(res){
					console.log(res);

					//$scope.property = res.data;
				});
			}
		});
		$scope.saveProperty = function(){
			//$scope.profile.user_id = user_id;
			console.log($scope.property);
			console.log($scope.property);
			Nerd.postProperty($scope.property).then(function(res){

			});
		}
});