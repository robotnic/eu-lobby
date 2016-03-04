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
//const hook = require('feathers-hooks');


let app = feathers();




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
  .use(favicon( join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(authentication( app.get('auth') ))
  .configure(services)
  .configure(middleware);


export default app;
