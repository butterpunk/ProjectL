angular.module('GeekCtrl', []).controller('GeekController', function($scope,$http, Nerd,$location) {
	$scope.profile = {
		dob: '',
		identification: '',
		phone_number: '',
		email: '',
		curent_address: '',
		leasor: '',
		income: '',
		credit_score: '',
		criminal_check: '',
		occupation: '',
		employer: '',
		animal_exist: '',
		animal_breed: '',
		education: '',
		current_stat: '',
		facebook: '',
		google: '',
		linked: '',
		reference_name: '',
		reference_number: '',
		roomates: '',
		user_id: '',
		name: '',
		age: '',
		hobbies: '',
		profile_photo_name: '',
		profile_photo_location: '',
		file_data: '',
	};
	$scope.leasor_flag = false; 
	
	Nerd.getVerify().then(function(res){
		console.log(res);
		if(res.data.message == "NO"){
			$location.path("/");
		}else{
			$scope.profile.user_id = res.data.user_id;
			
			Nerd.getProfile(res.data.user_id).then(function(res){
				console.log(res);
				if(res.data.success != false){
					$scope.profile = res.data;
				}
				if(res.data.leasor = true){
					$scope.leasor_flag = true; 
					$scope.profile.leasor="true";
				}
				//$scope.profile = res.data;
			});
			
		}
	});

	$scope.saveProfile = function(){
		//console.log($scope.profile.leasor);
			
	  console.log($scope.leasor);
	  var uploadFileFlag = false;
	  var f = document.getElementById('file').files[0],
	      r = new FileReader();	
	     
		if(f){
			r.onloadend = function(e){
				 $scope.profile.profile_photo_name = f.name;
				 $scope.profile.file_data = e.target.result;
			}
			r.readAsDataURL(f);
		}
		//$scope.profile.user_id = user_id;
		console.log($scope.profile);
		Nerd.postProfile($scope.profile).then(function(res){
			console.log(res);
		});

	}
	function uploadAttachment(f,r,tempid){
	  r.onloadend = function(e){

	    var data = {
	    	'fileObject' : e.target.result,
	    	'profile_id': $scope.profile.id,
	    	'file_name': f.name
	    }; 

	    //send your binary data via $http or $resource or do anything else with it
	    Task.setAttachment(data).then(function(result){
	   
	    }); 
		
	  }
	  r.readAsDataURL(f);				
	}
});