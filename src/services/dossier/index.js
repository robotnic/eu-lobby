import service from 'feathers-mongoose';
import hooks from './hooks';
import dossier from './dossier-model';


export default function(){
  const app = this;

  let options = {
    id:"_id",
    Model: dossier,
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/dossiers', service(options));

  // Get our initialize service to that we can bind hooks
  const dossierService = app.service('/api/dossiers');

  let dosHook = function(options) {
    return function(hook) {
      console.log('My custom hook ran!',hook.id);
        hook.id=String(hook.id);
	console.log(hook.id);
    }
  }

  // Get our initialize service to that we can bind hooks
  dossierService.before({
    get: [ dosHook() ]
  });


  // Set up our before hooks
  dossierService.before(hooks.before);

  // Set up our after hooks
  dossierService.after(hooks.after);
}
