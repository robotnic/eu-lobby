angular.module("timeline",["angularMoment",'ngSanitize'])
.directive('timeline', function() {
  return {
    templateNamespace: 'svg',

    template: `

<svg ng-if="height" width="95%" ng-attr-height="{{height +220}}px" ng-attr-view_box="0 0 1200 {{::height +220}}" xmlns:xlink="http://www.w3.org/1999/xlink">
<!-- {{height}}-->
<g transform="translate(50,50)">

<!-- year lines -->
<g ng-repeat="year in years" ng-attr-transform="translate({{ $index*yearWidth}},20)" fill="red" stroke="black">
	<line x1="0" y1="20" ng-attr-y2="{{height + 40}}" x2="0" stroke-width="2"  stroke="#efefef">
	</line>
	<text ng-attr-y="{{height+70}}" style="font-size:10px" text-anchor="middle" fill="grey" stroke="none">{{::year}}</text>
</g>

<!-- lines -->
<g ng-repeat="line in pixellines">
<line ng-if="!line.dotted"  ng-attr-x1="{{::line.coords[0][0]}}" ng-attr-y1="{{::line.coords[0][1]}}" ng-attr-x2="{{::line.coords[1][0]}}" ng-attr-y2="{{::line.coords[1][1]}}" fill="red" stroke="{{::line.color}}" stroke-width="3" stroke-linecap="round"> </line>
<line  ng-if="line.dotted" ng-attr-x1="{{::line.coords[0][0]}}" ng-attr-y1="{{::line.coords[0][1]}}" ng-attr-x2="{{::line.coords[1][0]}}" ng-attr-y2="{{::line.coords[1][1]}}" fill="red" stroke="{{::line.color}}" stroke-width="3" stroke-dasharray="5,5" stroke-linecap="round"> </line>
<g ng-if="line.drawdate">
<line   ng-attr-x1="{{::line.coords[0][0]}}" y1="35" ng-attr-x2="{{::line.coords[0][0]}}" ng-attr-y2="{{height+60}}" fill="red" stroke="black" stroke-width="0.4" stroke-dasharray="5,5" >{{::$index}}</line>
	<g ng-attr-transform="translate({{::line.coords[0][0]}},0)" y="00">
	<text x="30" y="00" transform="translate(0) rotate(-45 50 50)" font-size="10">{{::line.start|date}}</text>
	</g>
</g>
<a ng-attr-xlink:href="{{::line.url}}" target='_top'>
<text ng-if="!line.hit" style="font-size:10px" ng-attr-x="{{::line.coords[0][0] +3}}" ng-attr-y="{{::line.coords[0][1] -3}} "><tspan fill="black">{{::line.groupid}}</tspan> {{::line.abbr}}<tspan fill="gray"> {{::line.role}}</tspan></text>
</a>
</g>
</g>

</svg>
`,
    scope:{
	mep:"=",
	onselect:"&onselect"
    },
    controller:'timelineController'
  };
})
.controller("timelineController",function($scope,$sce){
	var totalwidth=1000;
	var height=400;
	var types=["Constituencies","Groups","Committees","Delegations"];
	$scope.pixellines=[];
	var delta=0;
	$scope.$watch("mep.UserID",function(){
		console.log("TIMELINE",$scope.mep);
		if($scope.mep){
			var minmax=getMinMax($scope.mep.Constituencies);
			makeRaster(minmax);
			var lastType="";
			for(var t=0;t< types.length;t++){
				console.log(t,types[t]);
				makeInfo(minmax,$scope.mep[types[t]],t);
			}
		}
	});

	function makeInfo(minmax,lines,type){
		if(!lines){
			console.log("no lines");
			return
		}
		var min=minmax.min.getTime();
		var max=minmax.max.getTime();
		var width=max - min;
		$scope.height=0;
		var abbrCache={}
		for(var i=lines.length-1;i>=0;i--){
			var item=lines[i];
			var y=i*25+20;
			var start=(new Date(item.start)).getTime();
			var end=(new Date(item.end)).getTime();
			var now=(new Date()).getTime();
			var x1=(start - min)*totalwidth/width;
			var x2=(end - min) * totalwidth/width;
			var xNow=(now - min) * totalwidth/width;
			
			var color="yellow";
			var hit=false;
			var drawdate=false;
			var abbr=item.abbr;
			var role=item.role;
			if(!abbr){
				abbr=item.party;
				color="black";	
				drawdate=true;
			}
			if(!abbr){
				abbr=item.Organization;
				color="lightgrey";	
				drawdate=false;
			}
			if(abbrCache[abbr]){
				y=abbrCache[abbr];
				hit=true;
			}else{
				delta++;
				y=delta*25+20;
			}
			if(item.role=='Member'){
				color='green'
			}
			if(item.role=='Member of the Bureau'){
				color='yellow'
			}
			if(item.role=='Vice-Chair'){
				color='orange'
			}
			if(item.role=='Chair'){
				color='red'
			}
			abbrCache[abbr]=y;
			abbrCache[abbr]=y;
			if($scope.height < y)$scope.height=y;
			var realX2=x2;
			if(x2 > xNow){
				var realX2=xNow;
			}
			if(x2>1200)x2=1200;

			var url="http://www.europarl.europa.eu/committees/en/ITRE/home.html";	
			if(item.type=="Committees"){
				url="http://www.europarl.europa.eu/committees/en/ITRE/home.html";	
			}
			url=$sce.trustAsResourceUrl(url);
			console.log(url);
			

			//past
			var pixelline={
				coords:[[x1, y+40],[realX2, y+40]],
				abbr:abbr,
				role:role,
				color:color,
				hit:hit,
				drawdate:drawdate,
				start:item.start,
				groupid:item.groupid,
				url:url
			}
			$scope.pixellines.push(pixelline);

			//dotted future;
			pixelline={
				coords:[[realX2, y+40],[x2, y+40]],
				abbr:item.abbr,
				color:color,
				hit:true,
				drawdate:false,
				dotted:true
			}
			
			$scope.pixellines.push(pixelline);

		}
		
	}
	function makeRaster(minmax){
		console.log("soweit so gut");
		$scope.years=[];
		var yearCount=minmax.max.getFullYear() - minmax.min.getFullYear() +1;
		$scope.minYear= minmax.min.getFullYear();
		$scope.yearWidth=totalwidth/(yearCount)*1.00;
		console.log(yearCount);
		for(var i=0;i<yearCount	;i++){
			$scope.years.push($scope.minYear+i);	
		}
	}

	function getMinMax(list){
		var min=new Date("9999-12-31")
		var max=new Date("1001-1-1")
		var now=new Date();
		if(list){
			for(var i=0;i<list.length;i++){
				var item=list[i];
				var startTime=new Date(item.start);
				var endTime=new Date(item.end);
				if(startTime < min)min=startTime
				if(endTime > max)max=endTime
			}
			if(max.getFullYear() > now.getFullYear()){
				max = new Date(now.getFullYear()+"-12-31");
			}	
			min = new Date(min.getFullYear()+"-1-1");
		}
		return {min:min,max:max}
	}
});
