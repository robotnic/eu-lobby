angular.module('dossier', [])
.controller("dossiercontroler", function($scope,$http,$stateParams){
	console.log("eh da");
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
