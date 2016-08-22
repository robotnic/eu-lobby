// message-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let messageSchema = new Schema({
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now},
  message: {type: Schema.Types.Mixed, required: true},
  id: {type: String, required: true},
});

let messageModel = mongoose.model('message', messageSchema);

export default messageModel;
