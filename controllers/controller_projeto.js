const utilities = require('../utilities/utilities')
const bcrypt = require('bcrypt');
const Model = require('../models/model_admin');
const ProjetoModel = require('../models/model_projeto')
const modelSubmissao = require('../models/model_submissoes')
const ColaboradoresModel = require('../models/model_colaboradores.js')


const Admin = Model.Admin;
const Projeto = ProjetoModel.Projeto;
const Submissao = modelSubmissao.Submissao;
const Colaborador = ColaboradoresModel.Colaborador;




const createProjeto = (req, res) => {

    utilities.validateAdmin(req.headers.authorization, (result) => {
        if (result) {
            const newProjeto = new Projeto({
                nome: req.body.nome,
                data_de_fim: req.body.data_de_fim,
                desc: req.body.desc,
                cartaz: req.body.cartaz,
                estado: req.body.estado
            })
            newProjeto.save(function (err) {
                if (err) {
                    res.status(400).send(err);
                }
                res.status(200).json("Projeto criado com sucesso");
            })
        } else {
            res.status(401).send("Not Authorized");
        }
    })

}
const getOneProjeto = (req, res) => {

    Projeto.findById(req.params.id).then((projeto) => {
        res.status(200).json(projeto)
    }).catch((error) => {
        res.status(400).send('Error');
    })


}

const getAllProjetos = (req, res) => {
    Projeto.find().then((projetolist) => {
        res.status(200).json(projetolist)
    }).catch((error) => {
        res.status(400).send('Error');
    })
}

const deleteProjeto = (req, res) => {
    Projeto.findByIdAndRemove(req.params.id, function (err, projeto) {
        if (projeto != null) {
            if (err) {
                console.log(err)
            }
            else {

                console.log("Deleted: " + projeto)
                res.status(200).send("Deleted: " + projeto)
            }
        }
        else{
            res.status(404).send("Not Found")
        }

    })
}



//-----------------------------------------------------------------------------------------//

const submissao = (req, res) => {
    const submissaoToCreate = new Submissao({
        id_user: req.body.id_user,
        id_projeto: req.params.id,
        ficheiro: req.body.ficheiro,
        estado: req.body.estado
    })
    Submissao.find({ id_user: req.body.id_user, id_projeto: req.params.id }, function (err, submissao) {
        if (err) {
            res.status(400).send(err);
        }
        if (submissao.length > 0) {
            res.status(406).send("Duplicated Submissao");

        } else {
            submissaoToCreate.save(function (err) {
                if (err) {
                    res.status(400).send(err);
                } else {

                    Projeto.findByIdAndUpdate(
                        req.params.id,
                        { $push: { submissoesAluno: submissaoToCreate._id } },
                        { safe: true, upsert: true, new: true },


                        function (err, model) {
                            console.log(err);
                        },

                        Colaborador.updateMany(
                            { tipo: "Júri" },
                            { $push: { submissoesPendentes: submissaoToCreate._id } },
                            { safe: true, upsert: true, },
                            function (err, model) {
                                console.log(err);
                            }
                        )

                    );

                    console.log(submissaoToCreate)
                    res.status(200).json("Submissao Criada");


                }

            })

        }
    })
}


exports.createProjeto = createProjeto;
exports.submissao = submissao;
exports.getOneProjeto = getOneProjeto;
exports.getAllProjetos = getAllProjetos;
exports.deleteProjeto = deleteProjeto;