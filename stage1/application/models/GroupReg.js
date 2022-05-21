const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    student_1: {
        type: String,
        required: true
    },
    student_2: {
        type: String,
        required: true
    },
    student_3: {
        type: String,
        required: true
    },
    student_4: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

GroupSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

GroupSchema.set('toJSON', {
    virtuals: true
});

module.exports = Group = mongoose.model("groupschema", GroupSchema);
