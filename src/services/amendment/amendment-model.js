// message-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let amendmentSchema = new Schema({
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now}
},{
  collection : 'amendments'
});

let amendmentModel = mongoose.model('amendment', amendmentSchema);

export default amendmentModel;
