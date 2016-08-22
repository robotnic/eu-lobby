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
    schemes:['http'],
    version: '0.0.0',
    basePath: '',
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
  .configure(authentication( app.get('auth') ))
  .configure(services)
  .configure(middleware)
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}));

export default app;
