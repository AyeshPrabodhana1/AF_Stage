const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateGroupRegisterInput(data) {
    let errors = {};
    data.groupName = !isEmpty(data.groupName) ? data.groupName : "";
    data.student_1 = !isEmpty(data.student_1) ? data.student_1 : "";
    data.student_2 = !isEmpty(data.student_2) ? data.student_2 : "";
    data.student_3 = !isEmpty(data.student_3) ? data.student_3 : "";
    data.student_4 = !isEmpty(data.student_4) ? data.student_4 : "";


    if (Validator.isEmpty(data.groupName)) {
        errors.groupName = "Group Name field is required";
    }
    if (Validator.isEmpty(data.student_1)) {
        errors.student_1 = "Student 01 name field is required";
    } 
    if (Validator.isEmpty(data.student_2)) {
        errors.student_2 = "Student 02 name is required";
    }
    if (Validator.isEmpty(data.student_3)) {
        errors.student_3 = "Student 03 name field is required";
    }
    if (Validator.isEmpty(data.student_4)) {
        errors.student_4 = "Student 04 name field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};