/**
* User.js
*/

module.exports = {
  identity: 'User',
  schema: false,
  autoPK: false,
  attributes: {
    name      : { type: 'string' },
    email     : { type: 'email' },
    uid       : { type: 'string', unique: true, primaryKey: true },
    provider  : { type: 'string' }
  }
};
