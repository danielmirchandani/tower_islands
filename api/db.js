const Firestore = require('@google-cloud/firestore');
const db = new Firestore();
db.settings({
	timestampsInSnapshots: true
});
module.exports = db;