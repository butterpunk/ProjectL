angular.module('NerdCtrl', []).controller('NerdController', function($scope,$http, Nerd,$location) {
	$scope.user = {};
	//$scope.error = '';
	$scope.error = '';

	Nerd.getVerify().then(function(res){
		console.log(res);
		if(res.data.message == "YES"){
			$location.path("/map");
		}else{

		}
	});
	
	$scope.loginfacebook = function(){
		window.location.href = '/auth/facebook';
	}
	
	$scope.login = function(){
		Nerd.getLogin($scope.user).then(function(res){
			if(res.data.success == true){
				$location.path("/map");
			}else{
				$scope.error = 'Something went wrong with your login. Most likely wrong email or password';
			}
		});
	}
	$scope.signup = function(){
		Nerd.setSignup($scope.user).then(function(res){
			console.log(res.data.success);
			if(res.data.success == true){
				$location.path("/profile");
			}else{
				$scope.error = 'Something went wrong with your signup. Most likely someone is already registered with that email address.';
			}
		});
	}
});