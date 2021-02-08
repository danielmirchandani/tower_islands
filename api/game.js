const cors = require('cors');
const db = require('./db.js');
const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
	res.send('game index');
});

router.get('/:id', (req, res) => {
	res.send('game read (' + req.params.id + ')');
});

router.options('/:id', cors());
router.put('/:id', (req, res) => {
	const gameId = req.params.id;
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
				console.log('No player with IP', req.ip);
				res.status(403).send('you\'re not playing this game!');
				return;
			}
			game.heights[5 * x + y] += 1;
			let json_string = JSON.stringify(game);
			res.status(200).send({
				board: JSON.parse(json_string),
			});
		} else {
			console.log('Tried to find game', gameId);
			res.status(404).send('game does not exist');
		}
	}).catch(err => {
		console.log('Error text', err);
		res.status(500).send(err);
	});
});

router.post('/', (_, res) => {
    res.send('game create');
});

module.exports = router;
