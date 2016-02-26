import service from 'feathers-mongoose';
import hooks from './hooks';
import vote from './vote-model';


export default function(){
  const app = this;

  let options = {
    id:"voteid",
    Model: vote,
    paginate: {
      default: 50,
      max:100 
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/votes', service(options));

  // Get our initialize service to that we can bind hooks
  const dossierService = app.service('/api/votes');

  // Set up our before hooks
  dossierService.before(hooks.before);

  // Set up our after hooks
  dossierService.after(hooks.after);
}
