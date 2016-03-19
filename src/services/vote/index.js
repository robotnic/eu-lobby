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
      max:100000 
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/votes', service(options));

  let myHook = function(options) {
    return function(hook) {
      console.log('My custom hook ran!',hook.params.query['For.groups.votes.ep_id']);
	//For
	 var epId = hook.params.query['For.groups.votes.ep_id']
	 if(epId) {
	      hook.params.query['For.groups.votes.ep_id'] = parseInt(epId, 10);
         }

	//Against
	 var epId = hook.params.query['Against.groups.votes.ep_id']
	 if(epId) {
	      hook.params.query['Against.groups.votes.ep_id'] = parseInt(epId, 10);
         }

	//Abstain
         var epId = hook.params.query['Abstain.groups.votes.ep_id']
         if(epId) {
              hook.params.query['Abstain.groups.votes.ep_id'] = parseInt(epId, 10);
         }

	//search
	 if (hook.params.query.$search) {
	    var search = hook.params.query.$search;
	    var regEx = new RegExp('.*' + search + '.*', 'i');
	    delete hook.params.query.$search;
	    hook.params.query.$or = [
	      { title: regEx },
	      { eptitle: regEx },
	    ];
	  }

    }
  }

  // Get our initialize service to that we can bind hooks
  const voteService = app.service('/api/votes');
  voteService.before({
    find: [ myHook() ]
  });

  // Set up our before hooks
  voteService.before(hooks.before);

  // Set up our after hooks
  voteService.after(hooks.after);
}
