/**
* Category.js
*/

module.exports = {
  identity: 'Category'
, schema: true
, attributes: {
    slug:         { type: 'string', unique: true }
  , name:         { type: 'string', unique: true }
  , description:  { type: 'string' }
  , api_provider: { type: 'string' }
  , api_url:      { type: 'string' }
  , parent:       { model: 'Category' }
  , children:     { collection: 'Category', via: 'parent' }
  , dossiers:     { collection: 'Dossier', via: 'category' }
  }
}
