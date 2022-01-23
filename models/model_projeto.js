const mongoose = require('mongoose');

const projetoSchema = new mongoose.Schema({
    nome: String,
    data_de_fim: Date,
    desc: String,
    cartaz: String,
    estado: String, //(a receber submissoes, a aguardar avaliação, etc)
    submissoesAluno: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'submissoes'
      },
      submissoesJuris: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'submissoes'
      },
      submissoesRevisor: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'submissoes'
      },
      submissoesIlustrador: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'submissoes'
      },
      submissoesDesigner: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'submissoes'
      },
})

const Projeto = mongoose.model('Projeto', projetoSchema);

exports.Projeto = Projeto