angular.module("cal",["angularMoment"])
.directive('cal', function() {
  return {
    template: `

<div style="position:relative;padding:20px">
<span  class="dateswitch">
<a  ng-click="year=year-1" style="cursor:pointer">&#160; &lt; &#160;</a>
<span>{{year}}</span>
<a ng-click="year=year+1" style="cursor:pointer">&#160; &gt; &#160;</a>
</span>
<div ng-repeat="month in cal.months" style="position:relative;padding:3px" ng-init="monthIndex=$index">
<span class="md-body-2">{{::month.name}}</span>
<div ng-repeat="day in month.days track by $index" class="day {{::day.activities[0].group}}" style="left:{{::100+$index*27 + month.days[0].day*27}}px;top:0px" ng-class="{free:day.weekend,today:day.today,activity:day.activities}" title="{{::day.title}}" ng-click="select(day)">{{::$index +1}}
</div>

</div>
</div>
</div>
<md-list>
<md-list-item  ng-if="selectedday.activities" ng-repeat="theactivity in selectedday.activities"><p><span class="{{::theactivity.group}} md-clickable">{{::theactivity.group}}</span> <a ng-href="{{::theactivity.titleUrl}}" target="_blank"> {{::theactivity.title}}</a></p>

<a ng-href="{{::format.url}}" target="_blank" ng-repeat="format in theactivity.formatList" class="icon {{::format.type}}">

</a>
</md-list-item>

</md-list>
`,
    scope:{
	mep:"=",
	onselect:"&onselect"
    },
    controller:'calController'
  };
})
.controller("calController",function($scope){
	$scope.customer={name:"franz"};

        $scope.year=2015;
        $scope.selectedday={};
        console.log("ddaa");
        $scope.$watch("year",function(){
                makeCalendar();
        });
        $scope.$watch("mep.UserID",function(){
                makeCalendar();
	});
        function makeCalendar(){
		console.log(".");
                $scope.cal={
                        months:[]
                }
                $scope.months=moment.monthsShort();
                for(var i=0;i<$scope.months.length;i++){
                        var dayCount=(new Date($scope.year,i+1,0)).getDate();
                        var days=[]
                        for(var d=0;d<dayCount;d++){
                                var date=moment($scope.year+"-"+(i+1)+"-"+(d+1));
                                var day={
                                        weekend:isWeekend(date),
                                        today:date.isSame(new Date(), "day"),
                                        day:date.day(),
                                        title:""
                                }
                                days.push(day);
                        }
                        $scope.cal.months.push({name:$scope.months[i],days:days});
                }
                loadMep();
        }
        $scope.getNumber = function(num) {
            return new Array(num);   
        }

        $scope.select=function(day){
                console.log(day.activities);
                $scope.selectedday.activities=day.activities;
	        $scope.onselect	({day:day});
        };
        function isWeekend(date) {
                if(date.day()<1 || date.day()>5){

                        return true;
                }else{
                        return false;
                }
        }
        function loadMep(){
                if($scope.mep){
                        var mep=angular.copy($scope.mep);
                        console.log("loaded");
                        for(var activity in mep.activities){
                                addToCal(activity,mep.activities[activity][8]);
                        }
                }
        }
	console.log($scope.mep);
	//loadMep();

        function addToCal(group,activity){
		console.log(group);
                for(var i=0;i<activity.length;i++){
                        var date=activity[i].date.split("-");
                        if(parseInt(date[2])==$scope.year){
                                var month=$scope.cal.months[parseInt(date[1]-1)];
                                var day=month.days[parseInt(date[0]-1)];
                                if(!day.activities){day.activities=[]}
				activity[i].group=group;
                                day.activities.push(activity[i]);
                                
                                day.title+=activity[i].title+"\n\n";
                        }
                }
        }

});
