const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller_admin');
const { validationResult, body } = require('express-validator');

router.route('/users/listAll').get(function(req, res) {
    controller.listAllUsers(req, res);
})

router.post('/login', function(req, res) {
    controller.login(req, res);
})
router.post('/Colab',function(req,res){
    controller.createColaborador(req,res)
})





module.exports = router;