/*
Returns get list

db.votes.aggregate([{ $group: { _id: "$report",votings:{ $push: {id:"$voteid",for:"$For.total",against:"$Against.total",abstain:"$Abstain.total",time:"$ts"} },title:{$first:"$eptitle"} }},{$skip:50},{$limit:50} ])
*/

//http://localhost:3030/api/votes?$skip=0&$limit=500&$sort[ts]=-1&$select[]=report&$select[]=ts&$select[]=eptitle

angular.module('vote', [])
.controller("votescontroller", function($scope,$http,$stateParams){
        console.log("votescontroller meldet sich zum dienst");
	var skip=0;
	var limit=10;
	var search="";
	$scope.search=function(){
		console.log($scope.searchstring);
		if($scope.searchstring.length >3){
			search="&$search="+$scope.searchstring;
			skip=0;
			load();
		}else{
			search="";
		}
	};
	$scope.loadMore=function(){
		console.log("give me more data");
		skip=skip+limit;
		load(true);
	};

	load();

	function load(keepdata){
		console.log("LIMIT",limit,skip);
		$scope.loading=true;
		var sort=JSON.stringify({UserId:1});
		$http.get("/api/votes?$skip="+skip+"&$limit="+limit+"&$sort[ts]=-1&$select[]=report&$select[]=title&$select[]=eptitle&$select[]=ts&$select[]=voteid&$select[]=For.total&$select[]=Against.total&$select[]=Abstain.total&$select[]=rapporteur&$select[]=dossierid"+search,{cache:true})
		.then(function(response){
			console.log(response);
			$scope.list=response.data.data;
			if(!keepdata){
				$scope.reports={}
			}
			for(var i=0;i<$scope.list.length;i++){
				var item=$scope.list[i];
				if(!$scope.reports[item.report]){
					$scope.reports[item.report]={
						eptitle:item.eptitle,
						title:item.title.substring(0,item.title.lastIndexOf("-")),
						items:[]
					}
				}
				item.subtitle=item.title.substring(item.title.lastIndexOf("-")+2);
				
				if(item.For && item.Against && parseInt(item.For.total) > parseInt(item.Against.total)){
					item.passed=true
				}
				if(item.For && item.Against && item.Abstain){
					var total=parseInt(item.For.total) + parseInt(item.Against.total) + parseInt(item.Abstain.total)
					item.For.percent=parseInt(item.For.total)/total*100;
					item.Against.percent=parseInt(item.Against.total)/total*100;
					item.Abstain.percent=parseInt(item.Abstain.total)/total*100;
				}
				
				$scope.reports[item.report].items.push(item);	
			}
			$scope.loading=false;
		},function(error){
			console.log(error);
			$scope.loading=false;
		});
	}

});
