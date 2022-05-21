const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TopicSchema = new Schema({

    topicName: {
        type: String,
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

TopicSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

TopicSchema.set('toJSON', {
    virtuals: true
});

module.exports = Topic = mongoose.model("topic", TopicSchema);
