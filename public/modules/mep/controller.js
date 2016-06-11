angular.module('mep', ['diff-match-patch'])
    .controller("mepcontroller", function($scope, $rootScope, $http, $stateParams,$state,$q) {
        var voteTypes = ["Against", "For", "Abstain"];
        $scope.mep = {};
        $scope.votings = {};
        console.log("mepcontroller");
        $rootScope.loading = true;

	//for the diff
	$scope.options = {
		editCost: 4,
		attrs: {
		  insert: {
		    'data-attr': 'insert',
		    'class': 'insertion'
		  },
		  delete: {
		    'data-attr': 'delete'
		  },
		  equal: {
		    'data-attr': 'equal'
		  }
		}
	      };



        $http.get("/api/meps/" + $stateParams.userid).then(function(response) {
            console.log("mep", response);
            $scope.mep = response.data;
            $rootScope.loading = false;
        }, function(error) {
            console.log(error);
            $rootScope.loading = false;
        });

        $scope.select = function(day) {
            console.log("--day--", day);
            $scope.selectedday = day;
        }

	$scope.onTabSelected=function(tab){
		console.log("TAB",tab);
		$state.go("mepsget.category",{userid:$stateParams.userid,category:tab});
	}
	$rootScope.$on('$stateChangeSuccess', function(e,toState){
		console.log("state changed",$state.params.category,toState);
		$scope.category=$state.params.category;
	});

	$scope.category=$state.params.category;

        //monge shell{"For.groups.votes.ep_id":124967}
        var query = "Against.groups.votes.ep_id=" + $stateParams.userid;

	var requests={}
        for (var i = 0; i < voteTypes.length; i++) {
            var voteType = voteTypes[i];
            console.log(voteType);
	    requests[voteType]=goForIt(voteType, $stateParams.userid);
        }
	$q.all(requests).then(function(response){
		console.log("hellp",response)
		$scope.votes=response;
		for (var i = 0; i < voteTypes.length; i++) {
			var data=response[voteTypes[i]].data;
			console.log(data.total);
			for(var j=0;j<data.data.length;j++){
				data.data[j].vote=voteTypes[i];
				var eptitle=data.data[j].eptitle
				if(!eptitle){
				   var title=data.data[j].title
			           var lastIndex=title.lastIndexOf("-");		
				   eptitle=data.data[j].title.substring(0,lastIndex);
				}
				if( !$scope.votings[eptitle]){
					$scope.votings[eptitle]=[]
				}
				$scope.votings[eptitle].push(data.data[j]);
			}
		}
	});


        //	var query="Against.groups.votes.ep_id="+$stateParams.userid;

        function goForIt(voteType, userid) {
            var query = voteType + ".groups.votes.ep_id=" + userid;
            var projection = "$select[]=title&$select[]=eptitle&$select[]=ts&$select[]=voteid";
            return $http.get("/api/votes/?" + query + "&$limit=50$skip=0&$sort[ts]=-1&" + projection);
        }

	function getAmendment(mep){
		$scope.loadingAmendment=true;
		var url="//"+location.host+"/api/amendments?meps="+mep+"&$limit=50&$sort[date]=-1"
		$http.get(url).then(function(response){
			$scope.loadingAmendment=false;
			console.log("amendment",response.data);
			$scope.amendments=response.data.data;
			for(var i=0;i<$scope.amendments.length;i++){
				console.log($scope.amendments[i]);

				$scope.amendments[i].newtext="";
				if($scope.amendments[i].new){
					$scope.amendments[i].newtext=$scope.amendments[i].new.join("\n");
				}

				$scope.amendments[i].oldtext="";
				if($scope.amendments[i].old){
					$scope.amendments[i].oldtext=$scope.amendments[i].old.join("\n");
				};
			}
		},function(error){
			$scope.loadingAmendment=error;
		});
	}
	getAmendment($stateParams.userid)
	$scope.userid=$stateParams.userid;
    });
