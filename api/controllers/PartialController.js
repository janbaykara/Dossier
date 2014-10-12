module.exports = {
    'render': function(req,res) {
        var name = req.params.name;
        res.render(__dirname + '/../../.tmp/public/partials/' + name + '.jade');
    }
};
