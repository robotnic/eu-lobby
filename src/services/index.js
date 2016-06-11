import message from './message';
import user from './user';
import dossier from './dossier';
import amendment from './amendment';
import meps from './meps';
import vote from './vote';
import proxy from './proxy';

import mongoose from 'mongoose';

export default function() {
  const app = this;
  
  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;
  
  app.configure(message);
  app.configure(user);
  app.configure(dossier);
  app.configure(amendment);
  app.configure(meps);
  app.configure(vote);
  app.configure(proxy);
}
