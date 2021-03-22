const express = require('express');
const router = express.Router();
const actions = require('../methods/actions')
router.get('/', (req, res) => {
    res.send("Hello baby ");
})
router.get('/dashboard', (req, res) => {
    res.send("Hello baby How are you?");
})

router.post('/adduser', actions.addNew)
router.post('/authenticate', actions.authenticate)
router.delete('/delete/:name', actions.delete)
router.get('/getinfo', actions.getinfo)
module.exports = router;