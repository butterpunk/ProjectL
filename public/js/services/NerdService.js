angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        savePost : function(title,body) {
            console.log(title,body);
            obj = {
                'title': title,
                'content': body
            };
            return $http.post('/api/challenges',obj);
        },
        getPostById: function(data){
            console.log(data);
            id = data;
            return $http.get('api/challenges/?id='+id);
        }
    }     
	

}]);