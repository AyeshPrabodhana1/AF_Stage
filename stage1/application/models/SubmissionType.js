const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SubmissionTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

SubmissionTypeSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

SubmissionTypeSchema.set('toJSON', {
    virtuals: true
});

module.exports = SubmissionType = mongoose.model("submissiontypes", SubmissionTypeSchema);
