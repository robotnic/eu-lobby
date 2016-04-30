var MEPS;
var countries=[];
angular.module("eu",['ui.router','ngMaterial','countrySelect',"ngSanitize","dossier",'mep','vote','cal','timeline','jsonFormatter','infinite-scroll','templates'])

.value('countries', {
	"Germany":"de", 
	"Belgium":"be", 
	"Czech Republic":"cz", 
	"United Kingdom":"gb", 
	"Malta":"ma", 
	"France":"fr", 
	"Netherlands":"nl", 
	"Spain":"es", 
	"Poland":"pl", 
	"Portugal":"pt", 
	"Italy":"it", 
	"Ireland":"ir", 
	"Austria":"at", 
	"Sweden":"se", 
	"Hungary":"hu", 
	"Latvia":"lv", 
	"Finland":"fi", 
	"Bulgaria":"bg", 
	"Lithuania":"lt", 
	"Slovenia":"sl", 
	"Denmark":"dk", 
	"Greece":"gr", 
	"Slovakia":"sk",
	"Romania":"ro",
	"Croatia":"hr",
	"":""
})
.value('parties',{
        "PPE":{logo:"https://upload.wikimedia.org/wikipedia/en/8/80/EPP_EP_group_logo_2015.png",color:"black"},
        "Verts/ALE":{logo:"https://upload.wikimedia.org/wikipedia/fr/thumb/e/e9/Logo_Verts_ALE_en.png/300px-Logo_Verts_ALE_en.png",color:"green"},
        "ALDE":{logo:"https://upload.wikimedia.org/wikipedia/de/2/2d/ALDE_logo.svg",color:"pink"},
        "S&D":{logo:"https://upload.wikimedia.org/wikipedia/commons/c/c4/Logo_S%26D_EN.png",color:"red"},
        "ECR":{logo:"https://upload.wikimedia.org/wikipedia/en/e/e9/European_Conservatives_and_Reformists_logo.png",color:"purple"},
        "ENF":{logo:"",color:"blue"},
        "EFD":{logo:"",color:"brown"},
        "GUE/NGL":{logo:"icons/gue_ngl.svg",color:"#ac161e"},
	"":""
})
.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/votes');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('votes', {
            url: '/votes',
//            templateUrl: 'modules/vote/list.html',
	    controller:'votescontroller',
	    templateProvider: function($templateCache){  
		return $templateCache.get('modules/vote/list.html');
            }
		
        })
         .state('votesget', {
            url: '/votes/:voteid',
            templateUrl: 'modules/vote/index.html',
            controller: function($scope,$http,$stateParams){
		console.log($stateParams);
		$scope.loading=true;
		$scope.selectedIndex=-1;
		$http.get("/api/votes/"+$stateParams.voteid).then(function(response){
			console.log(response);
			$scope.voteresult=response.data;
			$scope.loading=false;
			setTimeout(function(){
			doColor();
			},4000);
		},function(error){
			console.log(error);
			$scope.loading=false;
		});
		$scope.selectParty=function(party){
			$scope.group=party;
		}

		function doColor(){
			var paths=document.getElementsByTagName("path");
			console.log(paths);
			for(var i=0;i<paths.length;i++){
				console.log(i);
			}
			/*
			angular.forEach(angular.element("path"), function(value, key){
				console.log(key,value);
			     var a = angular.element(value);
			     a.addClass('xy');
			});
			*/
		}
	    }
		
        })

        .state('meps', {
	    url:'/meps',
//	    templateUrl: 'modules/mep/list.html',
            templateProvider: function($templateCache){
                return $templateCache.get('modules/mep/list.html');
            },

	    controller: function($scope,$rootScope,$http,$stateParams,countries,parties){
		console.log("--------------------meps list---------------");
		var view={
			skip:0,
			limit:15
		}
		$scope.countries=countries;
		$scope.parties=parties;
		$scope.selectedCountry=localStorage.getItem("country") ;
		var countrySelector="";
		if($scope.selectedCountry=="undefined"){
			$scope.selectedCountry=undefined;
		}else{
			countrySelector="&Groups.0.country="+$scope.selectedCountry
		}
console.log("goliat",$scope.selectedCountry,countrySelector);
		$scope.selectedParty=localStorage.getItem("party") ;
		var partySelector="";
		if($scope.selectedParty=="undefined"){
			$scope.selectedParty=undefined;
		}else{
			countrySelector="&Groups.0.country="+$scope.selectedCountry
		}
		$scope.$watch("selectedCountry",function(newValue, oldValue){
			if (newValue !== oldValue) {
				localStorage.setItem("country",$scope.selectedCountry)
				if($scope.selectedCountry){
					countrySelector="&Groups.0.country="+$scope.selectedCountry
				}else{
					countrySelector="";
				}
				view.skip=0;
				load();
			}
		});

		$scope.$watch("selectedParty",function(newValue, oldValue){
			if (newValue !== oldValue) {
				localStorage.setItem("party",$scope.selectedParty)
				if($scope.selectedParty){
					partySelector="&Groups.0.groupid="+encodeURIComponent($scope.selectedParty);
				}else{
					partySelector="";
				}
				view.skip=0;
				load();
			}
		});

		

		$scope.loadMore=function(){
			if(!$scope.loading){
				view.skip=view.skip+view.limit;
				var limit=view.limit;
				if($scope.meps && ($scope.meps.total + view.skip > view.limit)){
					limit=$scope.meps.total - view.skip
				}
				if(limit >0){			
					load(true);
				}
			}
	
		};
		
		load();
		function load(keep){
			console.log("now real loading",keep,view);
			$scope.loading=true;
			var url="/api/meps?$skip="+view.skip+"&$limit="+view.limit+"&$sort[Birth.date]=-1&$select[]=Birth&$select[]=Photo&$select[]=Name&$select[]=Groups&$select[]=UserID&$select[]=active"+countrySelector+partySelector;
			console.log(url,countrySelector);
			$http.get(url).then(function(response){
				if(keep){
					console.log("keep",$scope.meps.data.length,response.data);
					$scope.meps.data=$scope.meps.data.concat(response.data.data);
					console.log("keep",$scope.meps.data.length);
					$scope.$parent.splash=false;
				}else{
					$scope.meps=response.data;
				}
				$scope.loading=false;
			},function(error){
				console.log(error);
				//$scope.loading=false;
			});
		}
            }
	})
        .state('mepsget', {
	    url:'/meps/:userid',
	    templateUrl: 'modules/mep/index.html',
            controller: 'mepcontroller',
        })
        .state('mepsget.category', {
	    url:'/:category',
	    templateUrl: 'modules/mep/index.html',
            controller: 'mepcontroller',
        })
 
        .state('dossiers', {
	    url:'/dossier',
	    templateUrl: 'modules/dossier/list.html',
            controller: 'dossierlistcontroller',

	})
        .state('dossierget', {
	    url:'/dossier/:dossierid',
	    templateUrl: 'modules/dossier/index.html',
            controller: 'dossiercontroller',
        });
        
})
.controller("api",function($scope,$http){
	$scope.test="funkt";
	$scope.splash=false;
})


.filter("partylogo",function(parties){
	return function(party){
		if(parties[party]){
			return parties[party].logo
		}
	}
})
.filter("partycolor",function(parties){
	return function(party){
		console.log(party);
		if(parties[party]){
			return parties[party].color
		}
	}
})



.filter("flag",function($rootScope,countries){
	return function(country){
		return "https://cdn.rawgit.com/lipis/flag-icon-css/master/flags/4x3/"+countries[country]+".svg"
	}
})
.filter('toArray', function () {
  return function (obj, addKey) {
    if (!angular.isObject(obj)) return obj;
    if ( addKey === false ) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        var value = obj[key];
        return angular.isObject(value) ?
          Object.defineProperty(value, '$key', { enumerable: false, value: key}) :
          { $key: key, $value: value };
      });
    }
  };
})
