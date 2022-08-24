const bcrypt = require('bcryptjs');
const AuthService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const getToken = require('../utils/token');

class AuthController {
    #authService;

    constructor(authService) {
        this.#authService = authService;
    }

    register = async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const userExists = await this.#authService.getByEmail(
                email.toLowerCase()
            );

            if (userExists) {
                return res.status(409).json({
                    message: 'Email already in use. Please use another email.',
                });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = await this.#authService.register({
                username,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });

            res.status(201).json({
                user: {
                    email: user.email,
                    token: getToken(user._id, user.email),
                    username: user.username,
                },
            });
        } catch (e) {
            console.log('e', e);

            return res.status(500).json({
                message: 'Error occurred. Please try again.',
            });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await this.#authService.getUser(email);

            if (!user) {
                throw new Error('Incorrect email!');
            }

            const correctPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!correctPassword) {
                throw new Error('Incorrect password!');
            }

            res.status(200).json({
                user: {
                    email: user.email,
                    token: getToken(user._id, user.email),
                    username: user.username,
                },
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Something went wrong. Please try again.',
            });
        }
    };
}

module.exports = new AuthController(AuthService);
