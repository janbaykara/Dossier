/**
* User.js
*/

module.exports = {
  identity: 'User',
  schema: true,

  attributes: {
    name      : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    uid       : { type: 'string',  unique: true },
    provider  : { type: 'string' },
    dossiers  : { collection: 'Dossier', via: 'user' }
  }
};
