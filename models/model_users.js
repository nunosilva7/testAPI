const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    escola:{
        distrito: String,
        concelho: String,
        agrupamento: String,
        nome: String,
        morada: String,
        telefone: Number,
        email: String

    },
    professor:{
        nome: String,
        telefone: Number,
        email: String
    },
    interlocutor: {
        nome: String,
        telefone: Number,
        email: String
    },

    name: String,
    data_nascimento: Date,
    telefone: String,
    password: String,
    email: String,
    age: Number,

 
})

const Users = mongoose.model('Users', usersSchema);

exports.Users = Users;