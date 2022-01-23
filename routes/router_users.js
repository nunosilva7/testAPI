const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const controller = require('../controllers/controller_users');

router.post('/login', function(req, res) {
    controller.login(req, res);
})

router.post('/register', [
    body('name').notEmpty().escape(),
    body('password').notEmpty().escape(),
    body('email').notEmpty().escape(),
    body('age').notEmpty().escape(),
], function(req, res) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        controller.register(req, res);
    } else {
        res.status(404).json({ errors: errors.array() })
    }
})
router.get('/:id',function(req,res){
    controller.getSubmissoes(req,res)
})



module.exports = router;