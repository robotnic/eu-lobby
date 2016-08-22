import service from 'feathers-mongoose';
import hooks from './hooks';
import comagendas from './comagendas-model';


export default function(){
  const app = this;

  let options = {
    id:"id",
    Model: comagendas,
    paginate: {
      default: 25,
      max: 25
    }
  };

   let docs = {
        find: {
            description: "create Comagendas",
            tags: ["comagendas"],
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
                "name": "$sort[date]",
                "in": "query",
                "description": "Sort by date.",
                "type": "number",
                "default": -1,
            } ,{
                "name": "committee",
                "in": "query",
                "description": "Filter comagendas by committee.",
                "type": "string",
		"default":"IMCO"
            }

            ]
        },

        update: {
            description: "update Comagendas",
            tags: ["comagendas"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Comagendas by id.",
                "type": "number",
            }, {
                "name": "body",
                "in": "body",
                "description": "Comagendas",
                "type": "json",
                "example": "213"
            }]
        },
        get: {
            description: "get Comagendas by id",
            tags: ["comagendas"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Comagendas by id.",
                "type": "number"
            }]
        },
        create: {
            description: "update Comagendas",
            tags: ["comagendas"],
            parameters: [{
                "name": "body",
                "in": "body",
                "description": "Comagendas",
                "type": "json",

            }]
        },
        remove: {
            description: "delete Comagendas",
            tags: ["comagendas"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Comagendas by id.",
                "type": "number",
            }]
        },
  }


  // Initialize our service with any options it requires
    var thisService = service(options);
    thisService.docs = docs
    app.use('/api/comagendas', thisService);


  // Get our initialize service to that we can bind hooks
  const comagendasService = app.service('/api/comagendas');

    let login = function(options) {
        return function(hook) {
            if (!hook.params.user) {
                throw new Error('You are not authorized. Set the ?user=username parameter.');
            }

        }
    }


    comagendasService.before({
        find: [],
        update: [login()],
        get: [],
        create: [login()],
        remove: [login()],




    });


  // Set up our before hooks
  comagendasService.before(hooks.before);

  // Set up our after hooks
  comagendasService.after(hooks.after);
}
