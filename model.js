const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: String,
    facebookID: String,
    accessToken: String,

}, { coleccion: 'usuarios' })
const model = mongoose.model('usuarios', Schema)
module.exports = model