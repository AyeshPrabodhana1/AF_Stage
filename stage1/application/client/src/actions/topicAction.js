import axios from "axios";
import {
    GET_ERRORS,
    TOPIC_ADD,
    TOPIC_UPDATE,
} from "./types";

export const addTopic = (topicData, history) => dispatch => {
    axios
        .post("/api/topic/topic-add", topicData)
        .then(res =>
            dispatch({
                type: TOPIC_ADD,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};


export const updateTopic = (topicData) => dispatch => {
    axios
        .post("/api/topic/topic-update", topicData)
        .then(res =>
            dispatch({
                type: TOPIC_UPDATE,
                payload: res,
            })
        ).catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};
