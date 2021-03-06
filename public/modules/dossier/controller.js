angular.module('dossier', [])

//dossier list
.controller("dossierlistcontroller", function($scope,$http,$stateParams){
        var skip=0;
        var limit=5;
	$scope.selected={committee:"INST"};
	$scope.committees=[ "EMPL", "CONT", "AFET", "IMCO", "JURI", "TRAN", "DEVE", "ENVI", "INTA", "BUDG", "CULT", "ECON", "FEMM", "ITRE", "PECH", "AFCO", "AGRI", "REGI", "LIBE", "PETI", "RETT", "RELA", "ENER", "INST", "CODE", "CRIS", "SURE", "CLIM", "TDIP", "EQUI", "FINP", "DELE", "REGL", "CRIM", "EMIS", "TAXE" ]
	$scope.loading=false;
	
	function load(keepdata){
		if(!keepdata){
			skip=0;
		}
		var url="/api/dossiers?$skip="+skip+"&$limit="+limit+"&$sort[meta.updated]=-1";
		if($scope.selected.committee){
			url+="&committees.committee="+$scope.selected.committee;
		}
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

        $scope.committee=function(key){
		console.log(key);
		$scope.selected.committee=key;
		load();
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
		console.log("HAB DI REF",$scope.dossier.procedure.reference);
		//$http.get("/api/votes?dossierid="+$stateParams.dossierid).then(function(response){
		$http.get("/api/votes?epref="+$scope.dossier.procedure.reference).then(function(response){
			$scope.votings=response.data
			for(var i=0;i<$scope.votings.data.length;i++){
				if(parseInt($scope.votings.data[i].For.total) > parseInt($scope.votings.data[i].Against.total)){
					$scope.votings.data[i].result="For";
				}else{
					$scope.votings.data[i].result="Against";
				}
			}
		});
	},function(error){
		console.log(error);
	});
})
console.log("passt");
