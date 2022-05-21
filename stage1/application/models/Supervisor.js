const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SupervisorSchema = new Schema({

    supervisorname: {
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
    date: {
        type: Date,
        default: Date.now
    }
});

SupervisorSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

SupervisorSchema.set('toJSON', {
    virtuals: true
});

module.exports = Supervisor = mongoose.model("supervisor", SupervisorSchema);
