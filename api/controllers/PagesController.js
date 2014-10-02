/**
 * PagesController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    list : function (req, res, next) {
        Pages.find({})
            .exec(function (err, pages) {
                res.view('pages/list', {
                    pages : pages
                });
            });
    },
    
    edit : function (req, res, next) {
        Pages.findOne({ id : req.param('id') })
            .exec(function (err, page) {
                // console.log(page);
                res.view('pages/edit', {
                    page : page
                });
            });
    }
};

