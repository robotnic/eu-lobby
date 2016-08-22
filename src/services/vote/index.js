import service from 'feathers-mongoose';
import hooks from './hooks';
import vote from './vote-model';


export default function() {
    const app = this;

    let options = {
        id: "voteid",
        Model: vote,
        paginate: {
            default: 50,
            max: 100000
        }
    };


    let docs = {
        find: {
            description: "create Vote",
            tags: ["vote"],
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
            }, {
                "name": "epref",
                "in": "query",
                "description": "epref.",
                "type": "string",
		"default":"2016/2020(INI)"
            }, {
                "name": "Against.groups.votes.ep_id",
                "in": "query",
                "description": "stupid query.",
                "type": "string",
            },{
                "name": "For.groups.votes.ep_id",
                "in": "query",
                "description": "stupid query.",
                "type": "string",
            },{
                "name": "Abstain.groups.votes.ep_id",
                "in": "query",
                "description": "stupid query.",
                "type": "string",
            }




            ]
        },

        update: {
            description: "update Vote",
            tags: ["vote"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Vote by id.",
                "type": "number",
            }, {
                "name": "body",
                "in": "body",
                "description": "Vote",
                "type": "json",
                "example": "213"
            }]
        },
        get: {
            description: "get Vote by id",
            tags: ["vote"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Vote by id.",
                "type": "number"
            }]
        },
        create: {
            description: "update Vote",
            tags: ["vote"],
            parameters: [{
                "name": "body",
                "in": "body",
                "description": "Vote",
                "type": "json",

            }]
        },
        remove: {
            description: "delete Vote",
            tags: ["vote"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Vote by id.",
                "type": "number",
            }]
        },

    }





    // Initialize our service with any options it requires

    var thisService = service(options);
    thisService.docs = docs
    app.use('/api/votes', thisService);


    let myHook = function(options) {
        return function(hook) {
            console.log('My custom hook ran!', hook.params.query['For.groups.votes.ep_id']);
            //For
            var epId = hook.params.query['For.groups.votes.ep_id']
            if (epId) {
                hook.params.query['For.groups.votes.ep_id'] = parseInt(epId, 10);
            }

            //Against
            var epId = hook.params.query['Against.groups.votes.ep_id']
            if (epId) {
                hook.params.query['Against.groups.votes.ep_id'] = parseInt(epId, 10);
            }

            //Abstain
            var epId = hook.params.query['Abstain.groups.votes.ep_id']
            if (epId) {
                hook.params.query['Abstain.groups.votes.ep_id'] = parseInt(epId, 10);
            }

            //search
            if (hook.params.query.$search) {
                var search = hook.params.query.$search;
                var regEx = new RegExp('.*' + search + '.*', 'i');
                delete hook.params.query.$search;
                hook.params.query.$or = [{
                    title: regEx
                }, {
                    eptitle: regEx
                }, ];
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
    const voteService = app.service('/api/votes');
    voteService.before({
        find: [myHook()],
        update: [login()],
        get: [],
        create: [login()],
        remove: [login()],




    });

    // Set up our before hooks
    voteService.before(hooks.before);

    // Set up our after hooks
    voteService.after(hooks.after);
}
