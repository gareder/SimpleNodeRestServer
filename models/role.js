const { Schema, model } = require('mongoose');


const RoleShema = Schema({

  role: { type: String, required: [true, 'Role is required'] }

});

module.exports = model('Role', RoleShema);