var Q = require('q');

/**
 * PageController
 *
 * @description :: Server-side logic for managing page
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    list : function (req, res, next) {
        Page.find({}).populate('parent')
            .exec(function (err, pages) {
                res.view('page/list', {
                    pages : pages
                });
            });
    },

    edit : function (req, res, next) {

        Q.all([
            Page.findOne({ id : req.param('id') }).populate('parent'),
            Page.find({ id : { '!' : req.param('id') } })
        ]).spread(function (page, otherPages) {

            res.view('page/edit', {
                page : page, 
                otherPages : otherPages
            });
            
        });
    },

    // a CREATE action  
        create: function(req, res, next) {

            var params = req.params.all();

            Page.create(params, function(err, page) {

                if (err) return next(err);

                res.status(201);

                res.json(page);

            });

        },

        // a FIND action
        find: function(req, res, next) {

            var id = req.param('id');

            var idShortCut = isShortcut(id);

            if (idShortCut === true) {
                return next();
            }

            if (id) {

                Page.findOne(id, function(err, page) {

                    if (page === undefined) return res.notFound();

                    if (err) return next(err);

                    res.json(page);

                });

            } else {

                var where = req.param('where');

                if (_.isString(where)) {
                    where = JSON.parse(where);
                }

                var options = {
                    limit: req.param('limit') || undefined,
                    skip: req.param('skip') || undefined,
                    sort: req.param('sort') || undefined,
                    where: where || undefined
                };

                Page.find(options, function(err, page) {

                    if (page === undefined) return res.notFound();

                    if (err) return next(err);

                    res.json(page);

                });

            }

            function isShortcut(id) {
                if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
                    return true;
                }
            }

        },

        // an UPDATE action
        update: function(req, res, next) {

            var criteria = {};

            criteria = _.merge({}, req.params.all(), req.body);

            var id = req.param('id');

            if (!id) {
                return res.badRequest('No id provided.');
            }

            Page.update(id, criteria, function(err, page) {

                if (page.length === 0) return res.notFound();

                if (err) return next(err);

                res.json(page);

            });

        },

        // a DESTROY action
        destroy: function(req, res, next) {

            var id = req.param('id');

            if (!id) {
                return res.badRequest('No id provided.');
            }

            Page.findOne(id).done(function(err, result) {
                if (err) return res.serverError(err);

                if (!result) return res.notFound();

                Page.destroy(id, function(err) {

                    if (err) return next(err);

                    return res.json(result);
                });

            });
        }
};

