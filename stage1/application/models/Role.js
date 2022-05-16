const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

RoleSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

RoleSchema.set('toJSON', {
    virtuals: true
});

module.exports = Role = mongoose.model("roles", RoleSchema);
