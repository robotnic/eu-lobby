import service from 'feathers-mongoose';
import message from './message-model';
const rest = require('feathers-rest');
import hooks from './hooks';
import {
    hooks as auth
} from 'feathers-authentication';
const errors = require('feathers-errors');



export default function() {
    const app = this;

    let options = {
        Model: message,
        id: 'id',
        paginate: {
            default: 5,
            max: 25
        }
    };

    //swagger docs
    let docs = {
        find: {
            description: "create Message",
            tags: ["message"],
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
            }]
        },

        update: {
            description: "update Message",
            tags: ["message"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Message by id.",
                "type": "number",
            }, {
                "name": "body",
                "in": "body",
                "description": "Message",
                "type": "json",
                "example": "213"
            }]
        },
        get: {
            description: "get Message by id",
            tags: ["message"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Message by id.",
                "type": "number"
            }]
        },
        create: {
            description: "update Message",
            tags: ["message"],
            parameters: [{
                "name": "message",
                "in": "body",
                "description": "Message",
                "type": "json",

            }]
        },
        remove: {
            description: "delete Message",
            tags: ["message"],
            parameters: [{
                "name": "resourceId",
                "in": "path",
                "description": "Update Message by id.",
                "type": "number",
            }]
        },

    }


    // Initialize our service with any options it requires
    var thisService = service(options);
    thisService.docs = docs
    app.use('/messages', thisService);

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }

    let myHook = function(options) {
        return function(hook) {
            console.log('hook!', hook.data);
            hook.data = {
                "message": hook.data,
                id: uuid()
            }
        }
    }
    let updateHook = function(options) {
        return function(hook) {
            console.log('hook!', hook.data);
            hook.data = {
                "message": hook.data
            }
        }
    }



    let login = function(options) {
        return function(hook) {
            console.log(hook.params);
            if (!hook.params.user) {
                throw new errors.NotAuthenticated('You are not authorized. Set the ?user=username parameter.');
            }

        }
    }



    // Get our initialize service to that we can bind hooks
    const messageService = app.service('/messages');
    messageService.before({
        all: [
            auth.verifyToken(),
            auth.populateUser(),
        ],
        find: [
            login()

        ],
        update: [updateHook()],
        get: [auth.hashPassword()],
        create: [myHook()],
        remove: [auth.hashPassword()],




    });


    // Set up our before hooks
    messageService.before(hooks.before);

    // Set up our after hooks
    messageService.after(hooks.after);
}