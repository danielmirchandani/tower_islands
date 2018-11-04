/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const cors = require('cors');
const Firestore = require('@google-cloud/firestore');
const db = new Firestore();
db.settings({
	timestampsInSnapshots: true
});

const movePiece = (req, res) => {
	const game = req.body.game;
	const dest_x = req.body.x;
	const dest_y = req.body.y;
	db.collection('games').doc(game).get().then(doc => {
		if (doc.exists) {
			let player_index = -1;
			for (let i = 0; i < doc.data().players.length; ++i) {
				if (doc.data().players[i] === req.ip) {
					player_index = i;
					break;
				}
			}
			if (player_index === -1) {
				res.status(403).send('you\'re not playing this game!');
				return;
			}
			let json_string = JSON.stringify(doc.data());
			res.status(200).send({
				board: JSON.parse(json_string),
			});
		} else {
			res.status(404).send('game does not exist');
		}
	}).catch(err => {
		res.status(500).send(err);
	});
};

exports.movePiece = (req, res) => {
	cors()(req, res, () => {
		movePiece(req, res);
	});
};