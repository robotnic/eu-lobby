var http = require('http');
var fs = require('fs');
var lzma = require('lzma-native');
var decompressor = lzma.createDecompressor();

/*
* Download files from parltrack
*/
var files=["dossiers","meps_current","votes","amendments","comagendas"]


//loading files in parallel didn't work for me if you wounder why it isn't just a loop. It's a workaround
for(var i=0;i<files.length;i++){
	load(files[i]);
}

function load(filename){
	var url="http://parltrack.euwiki.org/dumps/ep_"+filename+".json.xz";
	var filedirname="data/"+filename+".json";
	//console.log("downloading "+url +" -> "+filedirname);
	var file = fs.createWriteStream(filedirname);
	var request = http.get(url, function(response) {
	     var decompressor = lzma.createDecompressor();
	     response.pipe(decompressor).pipe(file);
	});


}


/*
* from here it's firlefanz only
*/


console.log("This may take some minutes");
	console.log("About 100MByte will be downloaded and unpacked\n\n");
	console.log("When download is finished please import the files to your database using these shell commands\n");


for(var i=0;i<files.length;i++){
		console.log("mongoimport --upsert --db eulobby --collection "+files[i]+" --file data/"+files[i]+".json ");
}
console.log("(there may be some exeptions, but it should still import data)\n");

setTimeout(function(){
	console.log("\nSorry, there is no progress bar. To verify download is working you can watch the filesize in 'data' folder");
},5000);



