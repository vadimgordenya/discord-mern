const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    let token =
        req.body.token || req.query.token || req.headers['authorization'];

    console.log('req', req.headers['authorization']);

    if (!token) {
        return res.status(403).json({
            message: 'A token is required for authentication',
        });
    }

    try {
        token = token.replace(/^Bearer\s+/, '');

        console.log('');

        req.user = jwt.verify(token, config.JWT_SECRET);
    } catch (e) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }

    return next();
};

module.exports = verifyToken;
