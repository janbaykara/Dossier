/**
* Category.js
*/

module.exports = {
  identity: 'Category'
, schema: true
, attributes: {
    slug:         { type: 'string', unique: true }
  , name:         { type: 'string', unique: true }
  , description:  { type: 'string', defaultsTo: "I demand you look at ird."}
  , api_provider: { type: 'string', defaultsTo: "spotify"}
  , api_url:      { type: 'string', defaultsTo: "http://ws.spotify.com/search/1/track.json?q=track%3a"}
  , parent:       { model: 'Category' }
  , children:     { collection: 'Category', via: 'parent' }
  , dossiers:     { collection: 'Dossier', via: 'category' }
  }
}
