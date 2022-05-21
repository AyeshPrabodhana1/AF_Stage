const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sid: {
        type: String
    },
    phone: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

StudentSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

StudentSchema.set('toJSON', {
    virtuals: true
});

module.exports = Student = mongoose.model("students", StudentSchema);
