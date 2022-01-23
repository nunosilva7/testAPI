const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller_projeto');
const { validationResult, body } = require('express-validator');


router.post('/', function(req, res) {
    controller.createProjeto(req, res);
})

router.get('/',function(req,res) {
    controller.getAllProjetos(req,res);
})

router.get('/:id',function(req,res){
    controller.getOneProjeto(req,res)
})
router.post('/:id',function(req,res){
    controller.submissao(req,res)
})
router.delete('/:id',function(req,res){
    controller.deleteProjeto(req,res)
})




module.exports = router;