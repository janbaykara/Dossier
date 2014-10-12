/**
* User.js
*/

module.exports = {
  identity: 'user',
  schema: false,
  attributes: {
    name: { type: 'string', required: true },
    provider: { type: 'string', required: true },
    uid: { type: 'integer', required: true },
    dossiers: {
      model: 'dossier',
      via: 'user'
    }
  }
};
