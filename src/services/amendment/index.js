import service from 'feathers-mongoose';
import hooks from './hooks';
import amendments from './amendment-model';


export default function(){
  const app = this;

  let options = {
    id:"id",
    Model: amendments,
    paginate: {
      default: 25,
      max: 250
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/amendments', service(options));

  let myHook = function(options) {
    return function(hook) {
      console.log('Search amendments of mep ',hook.params.query.meps);
        hook.params.query.meps=parseInt(hook.params.query.meps);
    }
  }

  // Get our initialize service to that we can bind hooks
  const amendmentService = app.service('/api/amendments');
  amendmentService.before({
    find: [ myHook() ]
  });




  // Set up our before hooks
  amendmentService.before(hooks.before);

  // Set up our after hooks
  amendmentService.after(hooks.after);
}
