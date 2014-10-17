/**
* Dossier.js
*/

module.exports = {
  identity: 'Dossier',
  schema: true,
  attributes: {
    name:         { type: 'string', required: true }
  , description:  'string'
  , category:     { model: 'Category' }
  , user:         { model: 'User', required: true }
  , tags:         'array' // +++ Relate this to a TAG db model
  , api_url:      'string'
  , api_data:     'json'
  }
};
