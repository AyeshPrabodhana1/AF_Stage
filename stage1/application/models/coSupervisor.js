const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const coSupervisorSchema = new Schema({

    coSupervisorname: {
        type: String,
        required: true
    },    
    groupname: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    supervisorname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

coSupervisorSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

coSupervisorSchema.set('toJSON', {
    virtuals: true
});

module.exports = CoSupervisor = mongoose.model("cosupervisorschema", coSupervisorSchema);
