const UserModel = require('../models/user.model');

class AuthService {
    constructor() {}

    async register({ username, password, email }) {
        return await UserModel.create({ username, password, email });
    }

    async getUser(email) {
        return await UserModel.findOne({ email });
    }

    async getByEmail(email) {
        return await UserModel.exists({ email });
    }
}

module.exports = new AuthService();
