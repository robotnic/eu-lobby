import globalHooks from '../../../hooks';
import { hooks as auth } from 'feathers-authentication';

let before = {
  all: [],
  find: [],
  get: [],
};

let after = {
  all: [],
  find: [],
  get: [],
};

export default { before, after };
