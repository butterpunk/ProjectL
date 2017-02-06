angular.module('GeekCtrl', []).controller('GeekController', function($scope,$http, Nerd,$location) {
		$scope.profile = {
			user_id: '',
			name: '',
			age: ''
		};
		Nerd.getVerify().then(function(res){
			console.log(res);
			if(res.data.message == "NO"){
				$location.path("/");
			}else{
				$scope.profile.user_id = res.data.user_id;
				Nerd.getProfile(res.data.user_id).then(function(res){
					console.log(res);
					$scope.profile = res.data;
				});
			}
		});
		$scope.saveProfile = function(){
			//$scope.profile.user_id = user_id;
			console.log($scope.profile);
			Nerd.postProfile($scope.profile).then(function(res){

			});
		}
});