var request = require('request')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')
var lzma = require('lzma-native');
var decompressor = lzma.createDecompressor();


var parser = JSONStream.parse('*') //emit parts that match this path (any element of the rows array)
  , req = request({url: 'http://parltrack.euwiki.org/dumps/ep_votes.json.xz'})
  , logger = es.mapSync(function (data) {  //create a stream that logs to stderr,
	    console.log(data)
	    return data
  })

req.pipe(decompressor).pipe(parser)
parser.pipe(logger)

