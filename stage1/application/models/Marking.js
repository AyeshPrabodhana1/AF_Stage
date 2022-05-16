const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MarkingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    criticalAnalysis: {
        type: String,
        required: true
    },
    concept: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true
    },
    technicalAccuracy: {
        type: String,
        required: true
    },
    theory: {
        type: String,
        required: true
    },
    referencing: {
        type: String,
        required: true
    },
    presentation: {
        type: String,
        required: true
    }
});

MarkingSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

MarkingSchema.set('toJSON', {
    virtuals: true
});

module.exports = Marking = mongoose.model("markings", MarkingSchema);
