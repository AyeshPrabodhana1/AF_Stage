import axios from "axios";
import {
    GET_ERRORS,
    COSUPERVISOR_ADD,
    COSUPERVISOR_UPDATE
} from "./types";

export const addCoSupervisor = (roleData, history) => dispatch => {
    axios
        .post("/api/cosupervisor/cosupervisorRequest", roleData)
        .then(res =>
            dispatch({
                type: COSUPERVISOR_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updatCoSupervisor = (roleData) => dispatch => {
    axios
        .post("/api/cosupervisor/cosupervisor-update", roleData)
        .then(res =>
            dispatch({
                type: COSUPERVISOR_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
