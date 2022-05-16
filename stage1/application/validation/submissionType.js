const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSubmissionTypeInput(data) {
    let errors = {};
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};