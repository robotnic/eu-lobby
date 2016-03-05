import service from 'feathers-mongoose';
import meps from './meps-model';
import hooks from './hooks';

export default function(){
  const app = this;

  let options = {
    id:"UserID",
    Model: meps,
    paginate: {
      default: 10,
      max: 50
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/meps', service(options));


  let mepsHook = function(options) {
    return function(hook) {
      console.log('My custom hook ran!',hook.id);
	hook.id=parseInt(hook.id);
    }
  }

  // Get our initialize service to that we can bind hooks
  const userService = app.service('/api/meps');
  userService.before({
    get: [ mepsHook() ]
  });


  // Set up our before hooks
  userService.before(hooks.before);

  // Set up our after hooks
  userService.after(hooks.after);
}
