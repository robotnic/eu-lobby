'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = requireAdminToSetAdmin;
/**
 * If the user is not an admin, remove any admin attribute.  This prevents
 * unauthorized users from setting other users up as administrators.
 * This typically would be used on a user-type service.
 *
 * create, update, patch
 */
var defaults = { adminField: 'admin' };

function requireAdminToSetAdmin() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  options = Object.assign({}, defaults, options);

  return function (hook) {
    if (hook.params.user && !hook.params.user[options.adminField] && hook.params.provider) {
      delete hook.data[options.adminField];
    }
  };
}
module.exports = exports['default'];