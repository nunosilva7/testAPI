const mongoose = require('mongoose');

const submissaoSchema = new mongoose.Schema({
    id_user: String,
    id_projeto: String,
    ficheiro: String,
    estado: String //(em analise, aceite, etc)
})

const Submissao = mongoose.model('Submissao', submissaoSchema);

exports.Submissao = Submissao