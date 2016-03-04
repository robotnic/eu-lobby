var http = require('http');
var fs = require('fs');
var lzma = require('lzma-native');
var decompressor = lzma.createDecompressor();

/*
* Download files from parltrack
*/

var files=["ep_dossiers.json","ep_meps_current.json","ep_votes.json"]


//loading files in parallel didn't work for me if you wounder why it isn't just a loop. It's a workaround
for(var i=0;i<files.length;i++){
	load(files[i]);
}
console.log("this may take some minutes");
process.stdout.write("Waiting" );  // write text


function load(filename){
	var url="http://parltrack.euwiki.org/dumps/"+filename+".xz";
	var filedirname="data/"+filename;
	console.log("downloading "+url +" -> "+filedirname);
	var file = fs.createWriteStream(filedirname);
	var request = http.request(url, function(response) {
	     var decompressor = lzma.createDecompressor();
	     response.pipe(decompressor).pipe(file);
	});
	request.on("data",function(){
		console.lg("geil");
	});


}

  process.stdout.clearLine();  // clear current text
  process.stdout.clearLine();  // clear current text
  process.stdout.clearLine();  // clear current text

