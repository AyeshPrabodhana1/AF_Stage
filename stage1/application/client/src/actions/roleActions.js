import axios from "axios";
import {
    GET_ERRORS,
    ROLE_ADD,
    ROLE_UPDATE
} from "./types";

export const addRole = (roleData, history) => dispatch => {
    axios
        .post("/api/role/role-add", roleData)
        .then(res =>
            dispatch({
                type: ROLE_ADD,
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
                type: ROLE_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
