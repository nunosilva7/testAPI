const mongoose = require('mongoose');

const colaboradorSchema = new mongoose.Schema({
    username: String,
    telefone: String,
    email: String,
    password: String,
    tipo: {type: String, enum:['Júri', 'Revisor', 'Ilustrador','Designer']},
    submissoesPendentes:{
        
        type:mongoose.SchemaTypes.ObjectId,
        ref:'submissoes'
    },
    submissoesConcluidas:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'submissoes'
    },

   
    
})

const Colaborador = mongoose.model('Colaborador', colaboradorSchema);

exports.Colaborador = Colaborador