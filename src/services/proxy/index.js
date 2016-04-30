export default function(){
  var baseurl="http://www.europarl.europa.eu/mepphoto/";
var path = require('path');
  const app = this;


  // Initialize our service with any options it requires
  app.use('/proxy/:id', function(req, res, next){
	  var request = require('request');
  var fs = require('fs');

	console.log("proxy is working",req.params);
//	var writer = fs.createWriteStream('/tmp/xx.jpeg'); // meow meow etc.
	var url=baseurl+req.params.id+".jpg";
	var dest="images/"+req.params.id+".jpg";
	console.log(url,dest);
	var image=req.pipe(request(url))
	image.pipe(fs.createWriteStream(dest)); //.pipe(res);
	//req.pipe(request(url)).pipe(res);
	//image.pipe(res);
	//res.sendFile(path.join(__dirname, dest));
	res.status(200).send("end");
  });
}
