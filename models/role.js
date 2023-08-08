const { Schema, model } = require('mongoose');


const RoleShema = Schema({

  role: { type: String, required: [true, 'Role is obligatory'] }

});

module.exports = model('Role', RoleShema);