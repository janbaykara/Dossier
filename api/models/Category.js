/**
* Category.js
*/

module.exports = {
  identity: 'Category',
  schema: 'true',
  attributes: {
  }
    name:         { type: 'string', required: true },
    description:  { type: 'string', defaultsTo: "I demand you look at ird."},
    color:        { type: 'string', defaultsTo: "#d96200"},
    api_provider: { type: 'string', defaultsTo: "spotify"},
    api_url:      { type: 'string', defaultsTo: "http://ws.spotify.com/search/1/track.json?q=track%3a"},
    parent:       { model: 'Category' },
    children:     { collection: 'Category', via: 'parent' },
    dossiers:     { collection: 'Dossier', via: 'category' }
};

