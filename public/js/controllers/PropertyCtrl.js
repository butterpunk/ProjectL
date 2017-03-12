angular.module('PropertyCtrl', []).controller('PropertyController', function($scope,$http, Nerd,$location) {
	$scope.property = {
		user_id: '',
		address: '',
		price: '',
		bedrooms: '',
		bathrooms: '',
		date_avail: '',
		terms_avail: '',
		parking: '',
		proof_of_owner: '',
		file_data: '',
		profile_photo_name: ''
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
				if(res.data.success != false){
					$scope.property = res.data;
				}
			});
		}
	});
	$scope.saveProperty = function(){
		var uploadFileFlag = false;
			  var f = document.getElementById('file').files[0],
			      r = new FileReader();	
			     
				if(f){
					r.onloadend = function(e){
						 $scope.property.profile_photo_name = f.name;
						 $scope.property.file_data = e.target.result;
					}
					r.readAsDataURL(f);
		}
		//$scope.profile.user_id = user_id;
		Nerd.postProperty($scope.property).then(function(res){

		});
	}
	/*
	$scope.addFile = function(){
	  var f = document.getElementById('file').files[0],
	      r = new FileReader();
	  r.onloadend = function(e){
	    var data = {
	    	'fileObject' : e.target.result,
	    	'task_id': $scope.editObject.id,
	    	'file_name': f.name
	    }; 
	 
	    //send your binary data via $http or $resource or do anything else with it
	    Task.setAttachment(data).then(function(result){
	    
			Task.getTaskByID($scope.editObject.id).then(function(res){
			
				$scope.editObject = res.data.data.results[0];
				$scope.attachments = [];
		
			if($scope.editObject.attachments){
			
				angular.forEach($scope.editObject.attachments.default, function(val,key){
					$scope.attachments.push(val);
				})
			}
			});
	    }); 
		
	  }
	  r.readAsDataURL(f);
	}	*/
});