/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    scheme : true,
    attributes: {
        firstName : {
            type : 'string'
        },

        lastName : {
            type : 'string'
        },

        email : {
            type : 'string',
            email : true,
            required : true,
            // unique : true
        },

        encryptedPassword : {
            type : 'string'
        }
    },
    
    beforeCreate : function (values, next) {
        if (!values.password || values.password != values.passwordConfirmation) {
            return next({
                err : [ 'Password Is Not Good' ]
            });
        }

        bcrypt = require('bcrypt').hash(values.password, 10, function passwordEncrypted (err, encryptedPassword) {
            if (err) return next(err);
            values.encryptedPassword = encryptedPassword;
            next();
        });
    }

    // toJSON : function () {
    //     var obj = this.toObject();
    //     delete obj._csrf;
    //     delete obj.password;
    //     delete obj.password_confirmation;
    //     delete obj.encryptedPassword;
    //     return obj;
    // }
};





