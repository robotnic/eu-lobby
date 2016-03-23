angular.module('dossier', [])

//dossier list
.controller("dossierlistcontroller", function($scope,$http,$stateParams){
        var skip=0;
        var limit=5;
	$scope.loading=false;
	
	function load(keepdata){
		var url="/api/dossiers?$skip="+skip+"&$limit="+limit+"&$sort[meta.updated]=-1";
		$scope.loading=true;
		$http.get(url).then(function(response){
			$scope.loading=false;
			if(!keepdata){
				$scope.dossiers=response.data;
			}else{
				$scope.dossiers.data=$scope.dossiers.data.concat(response.data.data);;
			}
		});
	}

        $scope.loadMore=function(){
		if(!$scope.loading){
			skip=skip+limit;
			console.log("give me more data",skip);
			load(true);
		};
        };
	load();
})

//single dossier
.controller("dossiercontroller", function($scope,$http,$stateParams){
	console.log("dossierlistcontroler");

	$http.get("/api/dossiers/"+$stateParams.dossierid).then(function(response){
		console.log("r",response.data);
		$scope.dossier=response.data;
	},function(error){
		console.log(error);
	});
	$http.get("/api/votes/?dossierid="+$stateParams.dossierid).then(function(response){
		console.log(response.data);
		$scope.votings=response.data
	});
})
console.log("passt");
