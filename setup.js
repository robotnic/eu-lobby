/*
* download files and put into db
*/
var files=["ep_dossiers","ep_meps_current","ep_votes","ep_amendments"];
//var files=["ep_votes"];
//var files=["ep_dossiers"];


var fs = require('fs');
var request = require('request');
//var progress = require('request-progress');
var lzma = require('lzma-native');
//var JSONStream = require('JSONStream')
//var es = require('event-stream')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var makeSource = require("stream-json");



mongoose.connect('mongodb://localhost/eu-lobby');
var conn = mongoose.connection;
conn.on('error', function (err) {
	console.log('connection error', err);
});
/*
var allschema= new mongoose.Schema({
x:String
});
var AllSchema=mongoose.model("ep_votes",allschema);
*/



var states={};
var done={};
var notok={};
var saved={};
var schemas={};
var batch={};

//var files=["ep_dossiers","ep_meps_current","ep_votes","ep_amendments"]
//var files=["ep_votes"]
for(var i=0;i<files.length;i++){
	done[files[i]]=0;
	saved[files[i]]=0;
	notok[files[i]]=0;
	states[files[i]]=0;
	batch[files[i]]=[];
	//var allschema= new Schema({}, { strict: false });
	//schemas[files[i]]=mongoose.model(files[i],allschema);
	makeSchema(files[i])
        load(files[i]);
/*
schemas[files[i]].pre('save', function(next){
	console.log("presave");
    next();
});
*/
}

function makeSchema(name){
        var allschema= new Schema({}, { strict: false });
        schemas[name]=mongoose.model(name,allschema,name);
}


process.stdout.write("starting download" );  // write text

function write(name,state){
	if(name && state){
		states[name]=state;	
	}
	var text="";
	for(n in states){
		var transferred=""; //formatBytes(states[n].size.transferred);
		text+=n+": "+transferred+" "+saved[n]+"/"+notok[n]+"/"+done[n]+"  ";
	}
	process.stdout.clearLine();  // clear current text
	process.stdout.cursorTo(0); 
	process.stdout.write(text );  // write text
}

 
// The options argument is optional so you can omit it 

function load(name){
        var url="http://parltrack.euwiki.org/dumps/"+name+".json.xz";
        var filename="data/"+name+".json";
	var JSONStream = require('JSONStream')
	var es = require('event-stream')
        var decompressor = lzma.createDecompressor();
/*
var source = makeSource();

var fs = require("fs");

var objectCounter = 0;
//source.on("endObject", function(data){ console.log(arguments) });
source.output.on("data", function(data){
		console.log(data);
		batch[name].push(data);
		if(batch[name].length>99){
			//console.log("request",name);
			saveit(name,batch[name]);
			delete batch[name];
			batch[name]=[];
		}
		done[name]++;
		write();
	//saveit(name,chunk);
});
source.on("end", function(){
    console.log("end");
    saveit(name,batch[name]);
    delete batch[name];
});
*/

	request({url:url})
	.pipe(decompressor)
        .pipe(JSONStream.parse('*'))
        .pipe(es.mapSync(function (data) {
		batch[name].push(data);
		if(batch[name].length>99){
			//console.log("request",name);
			saveit(name,batch[name]);
			delete batch[name];
			batch[name]=[];
		}
		done[name]++;
		write();
	        return data
	 })).on("end",function(){
		conxole.log("--end---")
	});
 }
var x=0;
var y=0;
function saveit(name,data){
//	var conn = mongoose.connection;
	conn.collection(name).insert(data,null,function(error,result){
		if(error){
			console.log("error",name);
			//console.log(result.insertedCount);
		}
		if(result){
			saved[name]+=result.insertedCount;
			notok[name]+=100 - result.insertedCount;
			write();
		}
	});

}

function preprocess(name){
	console.log("setup db");
}


function formatBytes(bytes,decimals) {
   if(bytes == 0) return '0 Byte';
   var k = 1000; // or 1024 for binary
   var dm = decimals + 1 || 3;
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '' + sizes[i];
}
