const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('game index');
});

router.get('/:id', (req, res) => {
    res.send('game read (' + req.params.id + ')');
});

router.post('/', (req, res) => {
    res.send('game create');
});

module.exports = router;
