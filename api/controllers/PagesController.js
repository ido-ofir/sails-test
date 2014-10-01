/**
 * PagesController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    list : function () {
        Pages.find({})
            .exec(function (err, pages) {
                res.view('pages/koko', {
                    pages : pages
                });
            });
    },

	show : function (req, res, next) {
        Pages.findOne({ slug : req.param('slug') })
            .exec(function (err, page) {
                // console.log(page);
                res.view('pages/koko', {
                    page : page
                });
            });
    }
};

