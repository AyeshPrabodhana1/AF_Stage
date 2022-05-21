import {
    SET_CURRENT_USER,
    USER_ADD,
    USER_LOADING,
    USER_UPDATE,
    SET_CURRENT_ROLE,
    ROLE_ADD,
    ROLE_LOADING,
    ROLE_UPDATE,
    SET_CURRENT_SUBMISSION_TYPE,
    SUBMISSION_TYPE_ADD,
    SUBMISSION_TYPE_LOADING,
    SUBMISSION_TYPE_UPDATE
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    role: {},
    submissionType: {},
    loading: false,
};
export default function(state = initialState, action) {
    switch (action.type) {
        case USER_ADD:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_UPDATE:
            return {
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case ROLE_ADD:
            return {
                isAuthenticated: !isEmpty(action.payload),
                role: action.payload
            };
        case ROLE_UPDATE:
            return {
                isAuthenticated: !isEmpty(action.payload),
                role: action.payload,
            };
        case SET_CURRENT_ROLE:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                role: action.payload
            };
        case ROLE_LOADING:
            return {
                ...state,
                loading: true
            };
        case SUBMISSION_TYPE_ADD:
            return {
                isAuthenticated: !isEmpty(action.payload),
                submissionType: action.payload
            };
        case SUBMISSION_TYPE_UPDATE:
            return {
                isAuthenticated: !isEmpty(action.payload),
                submissionType: action.payload,
            };
        case SET_CURRENT_SUBMISSION_TYPE:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                submissionType: action.payload
            };
        case SUBMISSION_TYPE_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
