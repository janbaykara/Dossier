/**
* Dossier.js
*/

module.exports = {
  identity: 'dossier',
  schema: false,
  attributes: {
    name: { type: 'string', required: true },
    description: 'string',
    category: 'integer',
    subcategory: 'integer',
    api_url: 'string',
    api_data: 'json',
    category: { model: 'category' },
    user: { model: 'user', required: true }
  }
};
