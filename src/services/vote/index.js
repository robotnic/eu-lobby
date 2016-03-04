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

  let myHook = function(options) {
    return function(hook) {
      console.log('My custom hook ran!',hook.params.query['For.groups.votes.ep_id']);
	 var epId = hook.params.query['For.groups.votes.ep_id']
	 if(epId) {
	      hook.params.query['For.groups.votes.ep_id'] = parseInt(epId, 10);
         }
	 var epId = hook.params.query['Against.groups.votes.ep_id']
	 if(epId) {
	      hook.params.query['Against.groups.votes.ep_id'] = parseInt(epId, 10);
         }
         var epId = hook.params.query['Abstain.groups.votes.ep_id']
         if(epId) {
              hook.params.query['Abstain.groups.votes.ep_id'] = parseInt(epId, 10);
         }


    }
  }

  // Get our initialize service to that we can bind hooks
  const dossierService = app.service('/api/votes');
  dossierService.before({
    find: [ myHook() ]
  });

  // Set up our before hooks
  dossierService.before(hooks.before);

  // Set up our after hooks
  dossierService.after(hooks.after);
}
