import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTopic } from "../../actions/topicAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class TopicAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            topicName: "",
            groupName: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined) {
            $('#add-topic-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onTopicAdd = e => {
        e.preventDefault();
        const newTopic = {
            topicName: this.state.topicName,
            groupName: this.state.groupName
        };
        axios
        .post("/api/topic/topic-add", newTopic)
        .then(res => {
            if (res.status === 200) {
                toast(res.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                })
                window.location.reload();
            }
        });
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-topic-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Select your Topic</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onTopicAdd} id="add-topic">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Topic</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.topicName}
                                                id="topicName"
                                                type="text"
                                                error={errors.topicName}
                                                className={classnames("form-control", {
                                                    invalid: errors.topicName
                                                })}/>
                                            <span className="text-danger">{errors.topicName}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="Group Name">Group Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.groupName}
                                                error={errors.groupName}
                                                id="groupName"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.groupName
                                                })}
                                            />
                                            <span className="text-danger">{errors.groupName}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-topic"
                                    type="submit"
                                    className="btn btn-primary">
                                    Confirm Your Topic
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TopicAddModal.propTypes = {
    addTopic: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addTopic }
)(withRouter(TopicAddModal));
