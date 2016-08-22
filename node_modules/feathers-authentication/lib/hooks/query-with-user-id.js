'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queryWithUserId;
/**
 * Add the current user's id to the query params.
 *
 * find, get, update
 */
var defaults = {
  id: '_id',
  idOnResource: 'userId'
};

function queryWithUserId() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  options = Object.assign({}, defaults, options);

  return function (hook) {

    if (hook.params.user) {
      hook.params.query[options.idOnResource] = hook.params.user[options.id];
    }
  };
}
module.exports = exports['default'];