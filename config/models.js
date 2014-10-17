/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {
  /***************************************************************************
  * connections (see `config/connections.js`)                                *
  ***************************************************************************/
  connection: 'localMongoServer',

  /***************************************************************************
  * safe  : never auto-migrate my database(s). I will do it myself, by hand.
  * alter : auto-migrate columns/fields, but attempt to keep my existing data (experimental)
  * drop  : wipe/drop ALL my data and rebuild models every time I lift Sails
  ***************************************************************************/
  migrate: 'alter'
};
