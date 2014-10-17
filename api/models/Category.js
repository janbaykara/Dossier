/**
* Category.js
*/

module.exports = {
  identity: 'category',
  schema: false,
  attributes: {
    name: { type: 'string', required: true },
    description: 'string',
    color: 'string',
    color2: 'string',
    font: 'string',
    parent: { model: 'category' },
    children: {
      collection: 'category',
      via: 'parent'
    },
    dossiers: {
      collection: 'dossier',
      via: 'category'
    }
  , api: { model: 'API' }
  }
};

