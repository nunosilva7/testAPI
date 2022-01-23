const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_admin');
const UsersModel = require('../models/model_users')
const ColaboradoresModel = require('../models/model_colaboradores.js')


const Admin = Model.Admin;
const Users = UsersModel.Users;
const Colaborador = ColaboradoresModel.Colaborador;


const login = (req, res) => {

    Admin.find({ username: req.body.username }, function (err, admin) {
        if (err) {
            res.status(400).send(err);
        }

        if (admin.length > 0) {

            bcrypt.compare(req.body.password, admin[0].password).then(function (result) {

                if (result) {
                    utilities.generateToken({ type: 'admin' }, (token) => {
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



const listAllUsers = (req, res) => {

    utilities.validateAdmin(req.headers.authorization, (result) => {
        if (result) {
            Users.find().then((userslist) => {
                res.status(200).json(userslist)
            }).catch((error) => {
                res.status(400).send('Error');
            })
        } else {
            res.status(401).send("Not Authorized");
        }
    })

}


const createColaborador = (req, res) => {
    utilities.validateAdmin(req.headers.authorization, (result) => {
        if (result) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    const colaboradorToCreate = new Colaborador({
                        username: req.body.username,
                        telefone: req.body.telefone,
                        email: req.body.email,
                        password: hash,
                        tipo: req.body.tipo
                       
                    })
                    Colaborador.find({ email: req.body.email }, function(err, colaborador) {
                        if (err) {
                            res.status(400).send(err);
                        }
        
                        if (colaborador.length > 0) {
                            res.status(406).send("Duplicated User");
                        } else {
                            colaboradorToCreate.save(function(err, newUser) {
                                if (err) {
                                    res.status(400).send(err);
                                }
                                res.status(200).json("Registered User");
                            })
                        }
                    })
                })
            })
        }
        else {
            res.status(401).send("Not Authorized");
        }

    })

}


exports.login = login;
exports.listAllUsers = listAllUsers;
exports.createColaborador = createColaborador;

