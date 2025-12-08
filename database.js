const mongoose = require('mongoose'); 
 const URI = 'mongodb://localhost/usuarios'; 
 mongoose.connect(URI)
     .then(db => console.log('DB está conectada'))
     .catch(err => console.error(err));  
 module.exports = mongoose; 
