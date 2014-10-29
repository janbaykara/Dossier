/**
* User.js
*/

module.exports = {
  identity: 'User'
, schema: true
, autoPK: false
, attributes: {
    name:     { type: 'string' }
  , email:    { type: 'email' }
  , uid:      { type: 'string', unique: true, primaryKey: true }
  , provider: { type: 'string' }
  , dossiers: { collection: 'Dossier', via: 'user' }
  }
};
