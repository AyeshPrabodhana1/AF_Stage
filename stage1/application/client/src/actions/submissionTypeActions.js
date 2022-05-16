import axios from "axios";
import {
    GET_ERRORS,
    SUBMISSION_TYPE_ADD,
    SUBMISSION_TYPE_UPDATE
} from "./types";

export const addSubmissionType = (submissionTypeData, history) => dispatch => {
    axios
        .post("/api/submissionType/submissionType-add", submissionTypeData)
        .then(res =>
            dispatch({
                type: SUBMISSION_TYPE_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updateSubmissionType = (submissionTypeData) => dispatch => {
    axios
        .post("/api/submissionType/submissionType-update", submissionTypeData)
        .then(res =>
            dispatch({
                type: SUBMISSION_TYPE_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
