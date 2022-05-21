import axios from "axios";
import {
    GET_ERRORS,
    GROUP_ADD,
    GROUP_UPDATE
} from "./types";

export const addGroup = (groupData, history) => dispatch => {
    axios
        .post("/api/groupReg/group-add", groupData)
        .then(res =>
            dispatch({
                type: GROUP_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updateGroup = (groupData) => dispatch => {
    axios
        .post("/api/user-update", groupData)
        .then(res =>
            dispatch({
                type: GROUP_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
