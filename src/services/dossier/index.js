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

   let docs = {
        find: {
            description: "create Dossier",
            tags: ["dossier"],
            parameters: [{
                "name": "$skip",
                "in": "query",
                "description": "Number of skipped results",
                "type": "number",
            }, {
                "name": "$limit",
                "in": "query",
                "description": "Number of returned results.",
                "type": "number",
                "default": 5,
            }, {
                "name": "committees.committee",
                "in": "query",
                "description": "Filter dossiers by committee.",
                "type": "string",
		"default":"IMCO"
            }

            ]
        },

        update: {
            description: "update Dossier",
            tags: ["dossier"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Dossier by id.",
                "type": "number",
            }, {
                "name": "body",
                "in": "body",
                "description": "Dossier",
                "type": "json",
                "example": "213"
            }]
        },
        get: {
            description: "get Dossier by id",
            tags: ["dossier"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Dossier by id.",
                "type": "number"
            }]
        },
        create: {
            description: "update Dossier",
            tags: ["dossier"],
            parameters: [{
                "name": "body",
                "in": "body",
                "description": "Dossier",
                "type": "json",

            }]
        },
        remove: {
            description: "delete Dossier",
            tags: ["dossier"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Dossier by id.",
                "type": "number",
            }]
        },
  }


  // Initialize our service with any options it requires
    var thisService = service(options);
    thisService.docs = docs
    app.use('/api/dossiers', thisService);


  // Get our initialize service to that we can bind hooks
  const dossierService = app.service('/api/dossiers');

    let login = function(options) {
        return function(hook) {
            if (!hook.params.user) {
                throw new Error('You are not authorized. Set the ?user=username parameter.');
            }

        }
    }


    dossierService.before({
        find: [],
        update: [login()],
        get: [],
        create: [login()],
        remove: [login()],




    });


  // Set up our before hooks
  dossierService.before(hooks.before);

  // Set up our after hooks
  dossierService.after(hooks.after);
}
