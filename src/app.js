import { join } from 'path';
import { static as serveStatic } from 'feathers';
import favicon from 'serve-favicon';
import compress from 'compression';
import cors from 'cors';
import feathers from 'feathers';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import bodyParser from 'body-parser';
import socketio from 'feathers-socketio';
import authentication from 'feathers-authentication';
import middleware from './middleware';
import services from './services';
var FacebookStrategy = require('passport-facebook').Strategy;


var feathersSwagger = require('feathers-swagger');

//const hook = require('feathers-hooks');


let app = feathers();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Use Feathers Swagger Plugin
app.configure(feathersSwagger({ 
/* example configuration */ 
    docsPath:'/docs',
    basePath:'',
    schemes:['http'],
    version: '0.0.0',
    info: {
        'title': 'EU API',
        'description': 'API for EU Parlament',
        'termsOfServiceUrl': 'https://github.com/feathersjs/feathers-swagger/blob/master/LICENSE',
        'contact': 'example@example.com',
        'license': 'MIT',
        'licenseUrl': 'https://github.com/feathersjs/feathers-swagger/blob/master/LICENSE'
    },
}));


/*
app.service('members').before({
  find(hook) {
    const epId = hook.params.groups.votes.ep_id;
    if(epId) {
      hook.params.groups.votes.ep_id = parseInt(epId, 10);
    }
  }
});
*/

app.configure(configuration(join(__dirname, '..')))
  .use(compress())
  .options('*', cors())
  .use(cors())
//  .use(favicon( join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(authentication( {
	  facebook: {
	    strategy: FacebookStrategy,
	    'clientID': '1401876969840037',
	    'clientSecret': '0a5ee81fc1ba4aaaae13ae984ef68e17',
	    'permissions': {
	      authType: 'rerequest',
	      'scope': ['public_profile', 'email']
	    },
		callbackURL: 'http://www.localhost:3030/auth/facebook/callback'
	  }
	}

  ))
  .configure(services)
  .configure(middleware)
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}))


export default app;
