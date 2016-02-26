'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requireAuth;

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Only authenticated users allowed, period! Stops the request from continuing
 * if there is no hook.params.user. The request is allowed if there is no
 * `hook.params.provider` because that would mean the request was internal, and
 * didn't come across any of the providers.
 *
 * find, get, create, update, remove
 */
function requireAuth() {
  return function (hook) {

    if (!hook.params.user && hook.params.provider) {
      throw new _feathersErrors2.default.NotAuthenticated('Please include a valid auth token in the Authorization header.');
    }
  };
}
module.exports = exports['default'];