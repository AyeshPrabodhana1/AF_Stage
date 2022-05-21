import axios from "axios";
import {
    GET_ERRORS,
    SUPERVISOR_ADD,
    SUPERVISOR_UPDATE
} from "./types";

export const addSupervisor = (roleData, history) => dispatch => {
    axios
        .post("/api/supervisor/supervisorRequest", roleData)
        .then(res =>
            dispatch({
                type: SUPERVISOR_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updateRole = (roleData) => dispatch => {
    axios
        .post("/api/role/role-update", roleData)
        .then(res =>
            dispatch({
                type: SUPERVISOR_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
