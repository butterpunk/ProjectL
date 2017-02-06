angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        getLogin : function(obj) {
            return $http.post('/api/user/login',obj)
                    .success(function(data){})
                    .error(function(data){});
        },
        setSignup: function(data){
            return $http.post('/api/user/signup',data)              
                    .success(function(data){})
                    .error(function(data){});
        },
        getVerify: function(){
            return $http.post('/verify')              
                    .success(function(data){})
                    .error(function(data){});
        },
        getProfile: function(user_id){
             console.log('AH');
            return $http.get('/api/profile?user_id='+user_id)              
                    .success(function(data){
                    })
                    .error(function(data){
                    });
        },
        postProfile: function(obj){
            return $http.post('/api/profile',obj)              
                    .success(function(data){})
                    .error(function(data){});            
        }
    }     
	

}]);