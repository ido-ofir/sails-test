/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    add : function (req, res, next) {
        res.view('user/add');
    },

	'koko' : function (req, res, next) {
        User.getFirstName().exec(function (err, data) {
            console.log(data);
            res.json(data);
        });
    }
};

