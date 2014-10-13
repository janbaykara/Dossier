/**
* User.js
*/

module.exports = {
  identity: 'User',
  schema: false,

  attributes: {
    name      : { type: 'string' },
    email     : { type: 'email' },
    uid        : { type: 'string', unique: 'true' },
    provider  : { type: 'string' },
    dossiers  : { collection: 'Dossier', via: 'user' }
  }
};
