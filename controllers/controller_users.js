const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_users');
const ProjetoModel = require('../models/model_projeto')
const modelSubmissao = require('../models/model_submissoes');
const { vary } = require('express/lib/response');


const Users = Model.Users;
const Projeto = ProjetoModel.Projeto;
const Submissao = modelSubmissao.Submissao;


const login = (req, res) => {

    Users.find({ email: req.body.email }, function (err, user) {
        if (err) {
            res.status(400).send(err);
        }

        if (user.length > 0) {

            bcrypt.compare(req.body.password, user[0].password).then(function (result) {
                if (result) {
                    utilities.generateToken({ email: req.body.email, type: 'user' }, (token) => {
                        res.status(200).json(token);
                    })
                } else {
                    res.status(401).send("Not Authorized");
                }
            });


        } else {
            res.status(401).send("Not Authorized");
        }

    })
}

const register = (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {

            const userToCreate = new Users({
                escola: {
                    distrito: req.body.escola["distrito"],
                    concelho: req.body.escola["concelho"],
                    agrupamento: req.body.escola["agrupamento"],
                    nome: req.body.escola["nome"],
                    morada: req.body.escola["morada"],
                    telefone: req.body.escola["telefone"],
                    email: req.body.escola["email"]

                },
                professor: {
                    nome: req.body.professor["nome"],
                    telefone: req.body.professor["telefone"],
                    email: req.body.professor["email"]
                },
                interlocutor: {
                    nome: req.body.interlocutor["nome"],
                    telefone: req.body.interlocutor["telefone"],
                    email: req.body.interlocutor["email"]
                },
                name: req.body.name,
                data_nascimento: req.body.data_nascimento,
                telefone: req.body.telefone,
                email: req.body.email,
                password: hash,
                age: req.body.age

            });

            Users.find({ email: req.body.email }, function (err, user) {
                if (err) {
                    res.status(400).send(err);
                }

                if (user.length > 0) {
                    res.status(406).send("Duplicated User");
                } else {
                    userToCreate.save(function (err, newUser) {
                        if (err) {
                            res.status(400).send(err);
                        }
                        res.status(200).json("Registered User");
                    })
                }
            })
        });
    });
}

const getSubmissoes = (req, res) => {

    Submissao.find({ id_user: req.params.id }, function (err, docs) {
        if (docs.length > 0) {
            console.log(docs.length)

            var data = []

            for(let i = 0; i<docs.length;i++){
                data.push(docs[i].id_projeto)
            }
            console.log(data)
           

            Projeto.find({_id: {$in:data}}).then((projetoList) => {
                res.status(200).json(projetoList)
            }).catch((error) => {
                res.status(400).send('Error');
            })
           
          
        }
        else {
            res.status(400).send(err)
        }

    })
}





exports.login = login;
exports.register = register;
exports.getSubmissoes = getSubmissoes;