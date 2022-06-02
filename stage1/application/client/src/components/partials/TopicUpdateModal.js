import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateTopic } from "../../actions/topicAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class TopicModalUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            topicName: this.props.record.topicName,
            groupName: this.props.record.groupName,
    
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                topicName: nextProps.record.topicName,
                groupName: nextProps.record.groupName,
            })
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if (nextProps.auth !== undefined
            && nextProps.auth.user !== undefined
            && nextProps.auth.user.data !== undefined
            && nextProps.auth.user.data.message !== undefined
            && nextProps.auth.user.data.success) {
            $('#update-topic-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'group-update-groupName') {
            this.setState({ groupName: e.target.value });
        }
        if (e.target.id === 'group-update-topicName') {
            this.setState({ topicName: e.target.value });
        }
        
    };

    onTopicUpdate = e => {
        e.preventDefault();
        const newTopic = {
            _id: this.state.id,
            groupName: this.state.groupName,
            topicName: this.state.topicName,
        };
        axios
        .post("/api/topic/topic-updates", newTopic)
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
                <div className="modal fade" id="update-topic-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Topic</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onTopicUpdate} id="update-topic">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="group-topic-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Group Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.groupName}
                                                id="group-update-groupName"
                                                type="groupName"
                                                error={errors.groupName}
                                                className={classnames("form-control", {
                                                    invalid: errors.groupName
                                                })}/>
                                            <span className="text-danger">{errors.groupName}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Topic</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.topicName}
                                                error={errors.topicName}
                                                id="group-update-topicName"
                                                type="topicName"
                                                className={classnames("form-control", {
                                                    invalid: errors.topicName
                                                })}
                                            />
                                            <span className="text-danger">{errors.topicName}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-topic"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Group
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TopicModalUpdate.propTypes = {
    updateTopic: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateTopic }
)(withRouter(TopicModalUpdate));
