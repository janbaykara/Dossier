/**
* Category.js
*/

var RootCategoryID = "544175a4029f9a07bcdc0ce2";

function checkIfRoot(req,cb) {
  console.log("checkIfRoot")
  console.log(req)
  console.log(cb)

  if(req.where.id == RootCategoryID)
    return false;
  else
    return cb();
}

function checkIfAssignable(obj,cb) {
  console.log("checkIfAssignable")
  console.log(obj)
  console.log(cb)

  Category.find(obj.where.id).exec(function(err,cat) {
    if(obj.id == RootCategoryID || obj.parent == RootCategoryID || obj.parent == null) {
      obj.assignable = true;
    } else {
      obj.assignable = false;
    }
    cb();
  })
}

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
  , assignable:   { defaultsTo: true }
, }
, beforeDestroy: function(req,cb) { checkIfRoot(req,cb); }
, beforeCreate: function(req,cb)  { checkIfAssignable(req,cb); }
, beforeUpdate: function(req,cb)  { checkIfAssignable(req,cb); }
}
