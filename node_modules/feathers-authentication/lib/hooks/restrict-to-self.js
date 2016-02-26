'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = restrictToSelf;
/**
 * restrictToSelf - users can't see other users.
 * USER service only!s
 * @param {String} idProp is the key where the user's id can be found. defaults
 * to '_id'.
 *
 * find, get, create, update, remove
 */
function restrictToSelf() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var defaults = { idField: '_id' };
  options = Object.assign({}, defaults, options);

  return function (hook) {
    if (hook.params.user) {
      hook.params.query[options.idField] = hook.params.user[options.idField];
    } else {
      throw new Error('Could not find the user\'s ' + options.idField + ' for the restrictToSelf hook.');
    }
  };
}
module.exports = exports['default'];