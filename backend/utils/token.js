const jwt = require('jsonwebtoken');

const getToken = (id, email) => {
    return jwt.sign(
        {
            userId: id,
            email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

module.exports = getToken;
