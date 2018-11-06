/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const cors = require('cors');
const express = require('express');
const Firestore = require('@google-cloud/firestore');

const db = new Firestore();
db.settings({
	timestampsInSnapshots: true
});

const app = express();
app.use(cors());

app.post('/build-tower', (req, res) => {
	const gameId = req.body.game;
	const x = req.body.x;
	const y = req.body.y;
	db.collection('games').doc(gameId).get().then(doc => {
		if (doc.exists) {
			const game = doc.data();
			let player_index = -1;
			for (let i = 0; i < game.players.length; ++i) {
				if (game.players[i] === req.ip) {
					player_index = i;
					break;
				}
			}
			if (player_index === -1) {
				res.status(403).send('you\'re not playing this game!');
				return;
			}
			game.heights[5 * x + y] += 1;
			let json_string = JSON.stringify(game);
			res.status(200).send({
				board: JSON.parse(json_string),
			});
		} else {
			res.status(404).send('game does not exist');
		}
	}).catch(err => {
		res.status(500).send(err);
	});
});

exports.api = app;