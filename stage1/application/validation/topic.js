const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateTopicRegisterInput(data) {
    let errors = {};
    data.groupName = !isEmpty(data.groupName) ? data.groupName : "";
    data.topicName = !isEmpty(data.topicName) ? data.topicName : "";

    if (Validator.isEmpty(data.groupName)) {
        errors.groupName = "Group Name field is required";
    }
    if (Validator.isEmpty(data.topicName)) {
        errors.topicName = "Topic Name field is required";
    } 
    return {
        errors,
        isValid: isEmpty(errors)
    };
};