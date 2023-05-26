
module.exports = function(req, res, next) {
   if(!req.auth.isAdmin) res.status(403).send('Access Denied..!')
   next();
}