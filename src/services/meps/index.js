import service from 'feathers-mongoose';
import meps from './meps-model';
import hooks from './hooks';

export default function() {
    const app = this;

    let options = {
        id: "UserID",
        Model: meps,
        paginate: {
            default: 10,
            max: 50
        }
    };

    let docs = {
        find: {
            description: "find Mep",
            tags: ["mep"],
            parameters: [{
                "name": "$skip",
                "in": "query",
                "description": "Number of skipped results",
                "type": "number",
                "default": 0,
            }, {
                "name": "$limit",
                "in": "query",
                "description": "Number of returned results.",
                "type": "number",
                "default": 10,
            }, {
                "name": "Groups.0.country",
                "in": "query",
                "description": "MEPs Country.",
                "type": "string",
                "default": "Austria",
            }, {
                "name": "Groups.0.groupid",
                "in": "query",
                "description": "short name of party.",
                "type": "string",
            }, {
                "name": "active",
                "in": "query",
                "description": "mep is active member.",
                "type": "Boolean",
                "default": "true",
            }, {
                "name": "Name.aliases",
                "in": "query",
                "description": "Search mep by name.",
                "type": "string",
                "default": "Elisabeth KÖSTINGER",
            }]
        },

        update: {
            description: "update Mep",
            tags: ["mep"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Mep by id.",
                "type": "number",
            }, {
                "name": "body",
                "in": "body",
                "description": "Mep",
                "type": "json",
                "example": "213"
            }]
        },
        get: {
            description: "get Mep by id",
            tags: ["mep"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Mep by id.",
                "type": "number",
		"default":"124935"
            }]
        },
        create: {
            description: "update Mep",
            tags: ["mep"],
            parameters: [{
                "name": "body",
                "in": "body",
                "description": "Mep",
                "type": "json",

            }]
        },
        remove: {
            description: "delete Mep",
            tags: ["mep"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Mep by id.",
                "type": "number",
            }]
        },






    }

    // Initialize our service with any options it requires
    var thisService = service(options);
    thisService.docs = docs
    app.use('/api/meps', thisService);


    let mepsHook = function(options) {
        return function(hook) {
            console.log('My custom meps ran!', hook.id);
            hook.id = parseInt(hook.id);
        }
    }

    let boolHook = function(options) {
        return function(hook) {
            console.log('Boolinger!', hook.params.query.active,typeof(hook.params.query.active));
		if(typeof(hook.params.query.active)!=="undefined"){
			if(hook.params.query.active==="active"){
			    hook.params.query.active = true
			}else{
			    hook.params.query.active = false
			}
		}else{
			    delete hook.params.query.active;
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
    const userService = app.service('/api/meps');
    userService.before({
        find: [boolHook()],
        update: [login()],
        get: [mepsHook()],
        create: [login()],
        remove: [login()],

    });


    // Set up our before hooks
    userService.before(hooks.before);

    // Set up our after hooks
    userService.after(hooks.after);

}
