angular.module('mep', [])
.controller("mepcontroller",  function($scope,$rootScope,$http,$stateParams){
	console.log("mepcontroller");
	$rootScope.loading=true;
	$http.get("/api/meps/"+$stateParams.userid).then(function(response){
		console.log(response);
		$scope.mep=response.data;
		$rootScope.loading=false;
	},function(error){
		console.log(error);
		$rootScope.loading=false;
	});
	//monge shell{"For.groups.votes.ep_id":124967}
	var query="Against.groups.votes.ep_id="+$stateParams.userid;
	var projection="$select[]=title&$select[]=eptitle&$select[]=ts&$select[]=voteid&$select[]=Against.groups.votes.$."+$stateParams.userid;
        $http.get("/api/votes/?"+query+"&$limit=30$skip=0&$limit=20&$sort[ts]=-1&"+projection).then(function(response){
                console.log(response.data);
                $scope.votings=response.data
        });
});

