const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-login-token');
    if(!token) return res.status(401).send('Access Denied. No token provided..!');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
         req.auth = decoded;
         next();
    }
    catch(ex) {
       res.status(400).send('Invalid Token');
    }
}
