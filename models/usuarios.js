const mongoose = require('mongoose');
const {Schema} = mongoose;

const usuariosSchema = new Schema({
    name: {type:String, require:true},
    lastname: {type:String, require:true},
    email: {type:String, require:true},
    });

module.exports = mongoose.model('usuarios', usuariosSchema);
