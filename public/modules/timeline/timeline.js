angular.module("timeline",["angularMoment"])
.directive('timeline', function() {
  return {
    templateNamespace: 'svg',

    template: `

<svg width="1200px" height="{{height +220}}">
<g transform="translate(50,50)">

<!-- year lines -->
<g ng-repeat="year in years" transform="translate({{20 + $index*yearWidth}},20)" fill="red" stroke="black">{{::$index}}
<line ng-repeat="year in years" x1="0" y1="20" y2="{{height + 40}}" x2="0" stroke-width="2"  stroke="#efefef">{{::$index}}
</line>
<text y="{{height+70}}" style="font-size:10px" text-anchor="middle" fill="grey" stroke="none">{{::year}}</text>
</g>

<!-- lines -->
<g ng-repeat="line in pixellines">
<line ng-if="!line.dotted"  x1="{{::line.coords[0][0]}}" y1="{{::line.coords[0][1]}}" x2="{{::line.coords[1][0]}}" y2="{{::line.coords[1][1]}}" fill="red" stroke="{{::line.color}}" stroke-width="3" stroke-linecap="round"> </line>
<line  ng-if="line.dotted" x1="{{::line.coords[0][0]}}" y1="{{::line.coords[0][1]}}" x2="{{::line.coords[1][0]}}" y2="{{::line.coords[1][1]}}" fill="red" stroke="{{::line.color}}" stroke-width="3" stroke-dasharray="5,5" stroke-linecap="round"> </line>
<g ng-if="line.drawdate">
<line   x1="{{::line.coords[0][0]}}" y1="35" x2="{{::line.coords[0][0]}}" y2="{{height+60}}" fill="red" stroke="black" stroke-width="0.4" stroke-dasharray="5,5" >{{::$index}}</line>
	<g transform="translate({{::line.coords[0][0]}},0)" y="00">
	<text x="30" y="00" transform="translate(0) rotate(-45 50 50)" font-size="10">{{::line.start|date}}</text>
	</g>
</g>
<text ng-if="!line.hit" style="font-size:10px" x="{{::line.coords[0][0] +3}}" y="{{::line.coords[0][1] -3}} ">{{::line.abbr}}</text>
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
.controller("timelineController",function($scope){
	var totalwidth=1000;
	var types=["Constituencies","Committees","Delegations"];
	$scope.pixellines=[];
	var delta=0;
	$scope.$watch("mep.UserID",function(){
		console.log("TIMELINE",$scope.mep);
		if($scope.mep){
			var minmax=getMinMax($scope.mep.Constituencies);
			console.log(minmax);
			makeRaster(minmax);
			for(var t=0;t< types.length;t++){
				console.log(t,types[t]);
				makeInfo(minmax,$scope.mep[types[t]]);
			}
		}
	});

	function makeInfo(minmax,lines){
		console.log(minmax,lines);
		var min=minmax.min.getTime();
		var max=minmax.max.getTime();
		var width=max - min;
		$scope.height=0;
		var abbrCache={}
		for(var i=lines.length-1;i>=0;i--){
			var item=lines[i];
			console.log("item",item);
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
			if(!abbr){
				abbr=item.party;
				color="black";	
				drawdate=true;
			}
			if(!abbr){
				abbr=item.Organization;
				color="yellow";	
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
			abbrCache[abbr]=y;
			if($scope.height < y)$scope.height=y;
			var realX2=x2;
			if(x2 > xNow){
				var realX2=xNow;
			}
			var pixelline={
				coords:[[x1, y+40],[realX2, y+40]],
				abbr:abbr,
				color:color,
				hit:hit,
				drawdate:drawdate,
				start:item.start
			}
			$scope.pixellines.push(pixelline);

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
		console.log("pixellines",$scope.pixellines);
		console.log($scope.height);
		
	}
	function makeRaster(minmax){
		console.log("soweit so gut");
		$scope.years=[];
		var yearCount=minmax.max.getFullYear() - minmax.min.getFullYear() +1;
		$scope.minYear= minmax.min.getFullYear();
		$scope.yearWidth=Math.round(totalwidth/yearCount)
		console.log(yearCount);
		for(var i=0;i<yearCount	;i++){
			$scope.years.push($scope.minYear+i);	
		}
	}

	function getMinMax(list){
		console.log(list); //d
		var min=new Date("9999-12-31")
		var max=new Date("1001-1-1")
		var now=new Date();
		for(var i=0;i<list.length;i++){
			var item=list[i];
			console.log(item.start,item.end);
			var startTime=new Date(item.start);
			var endTime=new Date(item.end);
			console.log(startTime,endTime);
			if(startTime < min)min=startTime
			if(endTime > max)max=endTime
		}
		if(max.getFullYear() > now.getFullYear()){
			max = new Date(now.getFullYear()+"-12-31");
		}	
		min = new Date(min.getFullYear()+"-1-1");
		console.log("done",min,max);
		return {min:min,max:max}
	}
});
