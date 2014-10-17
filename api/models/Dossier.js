/**
* Dossier.js
*/

module.exports = {
  name:         { type: 'string', required: true }
, identity: 'Dossier'
, schema: true
, attributes: {
    description:  'string'
  , category:     { model: 'Category' }
  , user:         { model: 'User', required: true }
  , tags:         'array' // +++ Relate this to a TAG db model
  , api_url:      'string'
  , api_data:     'json'
  }
};
