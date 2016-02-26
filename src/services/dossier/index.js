import service from 'feathers-mongoose';
import hooks from './hooks';
import dossier from './dossier-model';


export default function(){
  const app = this;

  let options = {
    id:"id",
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

  // Set up our before hooks
  dossierService.before(hooks.before);

  // Set up our after hooks
  dossierService.after(hooks.after);
}
