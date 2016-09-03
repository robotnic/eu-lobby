// user-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
  text: {type: String, required: false, index: true},
  createdAt: {type: Date, 'default': Date.now},
  updatedAt: {type: Date, 'default': Date.now},
  facebookId: { type: String },
  facebook: { type: Schema.Types.Mixed },
  linkedinId: { type: String },
  linkedin: { type: Schema.Types.Mixed },
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true },

  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

let userModel = mongoose.model('user', userSchema);

export default userModel;
