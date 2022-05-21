const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCoSupervisorRequest(data) {
    let errors = {};
    data.supervisorname = !isEmpty(data.supervisorname) ? data.supervisorname : "";
    data.coSupervisorname = !isEmpty(data.coSupervisorname) ? data.coSupervisorname : "";
    data.groupname = !isEmpty(data.groupname) ? data.groupname : "";
    data.topic = !isEmpty(data.topic) ? data.topic : "";

    if (Validator.isEmpty(data.groupname)) {
        errors.groupname = "Group name field is required";
    }
    if (Validator.isEmpty(data.topic)) {
        errors.topic = "Topic field is required";
    } 
    if (Validator.isEmpty(data.supervisorname)) {
        errors.supervisorname = "Supervisor field is required";
    } 
    if (Validator.isEmpty(data.coSupervisorname)) {
        errors.coSupervisorname = "Co-Supervisorname field is required";
    } 
    return {
        errors,
        isValid: isEmpty(errors)
    };
};