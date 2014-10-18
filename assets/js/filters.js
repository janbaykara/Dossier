app.filter('hideIfThis', function() {
  return function(categories,ngRepeatCat) {
    catsThatArentThisOne = _.filter(categories, function(cat) {
      return cat.id != ngRepeatCat.id;
    })
    return catsThatArentThisOne;
  }
});
