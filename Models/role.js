const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: true,
    },
})

module.exports = model('Role', RoleSchema);