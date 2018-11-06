/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const buildTower = require('./build-tower.js');
const game = require('./game.js');
const cors = require('cors');
const express = require('express');

const app = express();
app.use('/build-tower', buildTower);
app.use('/game', game);
app.use(cors());
exports.api = app;