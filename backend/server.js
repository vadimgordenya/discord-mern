const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoutes');
require('dotenv').config();

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

// register the routes
app.use('/api/auth', authRouter);

const server = http.createServer(app);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(PORT, () =>
            console.log(`Server is listening on ${PORT}`)
        );
    })
    .catch((err) => {
        console.log('database connection failed. Server not started.');
        console.log(err);
    });
