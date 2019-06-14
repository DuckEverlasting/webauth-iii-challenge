const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const authRouter = require('../routers/authRouter.js');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', authRouter);

module.exports = server;