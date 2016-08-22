import service from 'feathers-mongoose';
import hooks from './hooks';
import amendments from './amendment-model';


export default function() {
    const app = this;

    let options = {
        id: "id",
        Model: amendments,
        paginate: {
            default: 25,
            max: 350
        }
    }
    let docs = {
        find: {
            description: "Find Amendment",
            tags: ["amendment"],
            parameters: [{
                    "name": "$skip",
                    "in": "query",
                    "description": "Get Amendment by id.",
                    "type": "number",
                }, {
                    "name": "$limit",
                    "in": "query",
                    "description": "Get Amendment by id.",
                    "type": "number",
                }, {
                    "name": "meps",
                    "in": "query",
                    "description": "Member of Parlament id",
                    "type": "string",
		    "default":"124935"
                }, {
                    "name": "committee",
                    "in": "query",
                    "description": "Filter by committee",
                    "type": "string",
		    "default":"BUDG"
                }, {
                    "name": "reference",
                    "in": "query",
                    "description": "Filter by ref",
                    "type": "string",
		    "default":"2012/2107(DEC)"
                }


            ]
        },
	update:{
	    description: "update Amendment",
            tags: ["amendment"],
            parameters: [{
                    "name": "resourceId",
                    "in": "path",
                    "description": "Update Amendment by id.",
                    "type": "number",
                },{
		    "name": "body",
                    "in": "body",
                    "description": "Amendment",
                    "type": "json",
			"example":"213"
		}
	    ]
	},
	get:{
	    description: "get Amendment by id",
            tags: ["amendment"],
            parameters: [{
                    "name": "resourceId",
                    "in": "path",
                    "description": "Update Amendment by id.",
                    "type": "number"
                }
	    ]
	},
	create:{
	    description: "update Amendment",
            tags: ["amendment"],
            parameters: [{
		    "name": "body",
                    "in": "body",
                    "description": "Amendment",
                    "type": "json",

		}
	    ]
	},
	remove:{
	    description: "delete Amendment",
            tags: ["amendment"],
            parameters: [{
                    "name": "resourceId",
                    "in": "path",
                    "description": "Update Amendment by id.",
                    "type": "number",
                }
	    ]
	},




    };

    // Initialize our service with any options it requires
    var thisService = service(options);
    thisService.docs = docs;
    console.log("\n=======thisService=====\n", thisService);
    app.use('/api/amendments', thisService);

    let myHook = function(options) {
        return function(hook) {
            if (!hook.params.query.meps) {
                delete hook.params.query.meps
            } else {
                hook.params.query.meps = parseInt(hook.params.query.meps);
            }
        }
    }

    let login = function(options) {
        return function(hook) {
            if (!hook.params.user) {
                throw new Error('You are not authorized. Set the ?user=username parameter.');
            }

        }
    }

    // Get our initialize service to that we can bind hooks
    const amendmentService = app.service('/api/amendments');
    amendmentService.before({
        find: [myHook()],
        update: [login()],
        get: [],
        create: [login()],
        remove: [login()],
    });




    // Set up our before hooks
    amendmentService.before(hooks.before);

    // Set up our after hooks
    amendmentService.after(hooks.after);
    amendmentService.docs = "123"
}
