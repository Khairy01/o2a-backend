const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookies('jwt', '', {maxAge: 1 });
                next();
            }else {
                let user = await dispatch( UserModel.findById(decodedToken.id));
                res.locals.user = user;
                next();
            }
        });
    }else {
        res.locals.user = null;
        next();
    }
}

module.exports.requiredAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else{
                console.log(decodedToken.id);
                next(err);
            } 
        }); 
    } else {
        console.log('no token found');
    } 
};
