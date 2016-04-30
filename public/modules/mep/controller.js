angular.module('mep', [])
    .controller("mepcontroller", function($scope, $rootScope, $http, $stateParams,$state) {
        var voteTypes = ["Against", "For", "Abstain"];
        $scope.mep = {};
        $scope.votings = [];
        console.log("mepcontroller");
        $rootScope.loading = true;
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

        for (var i = 0; i < voteTypes.length; i++) {
            var voteType = voteTypes[i];
            console.log(voteType);
            //        goForIt(voteType, $stateParams.userid);
        }

        //	var query="Against.groups.votes.ep_id="+$stateParams.userid;

        function goForIt(voteType, userid) {
            var query = voteType + ".groups.votes.ep_id=" + userid;
            console.log(query);
            var projection = "$select[]=title&$select[]=eptitle&$select[]=ts&$select[]=voteid&$select[]=" + voteType + ".groups.votes.$." + userid;
            $http.get("/api/votes/?" + query + "&$limit=10$skip=0&$sort[ts]=-1&" + projection).then(function(response) {
                console.log(response.data);
                for (var i = 0; i < response.data.data.length; i++) {
                    response.data.data[i].vote = voteType;
                }
                $scope.votings = $scope.votings.concat(response.data.data)
                console.log($scope.votings);
            });
        }
    });
