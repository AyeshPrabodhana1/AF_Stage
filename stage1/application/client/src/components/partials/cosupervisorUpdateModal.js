import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatCoSupervisor } from "../../actions/cosupervisorAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class CoSupervisorUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            supervisorname: this.props.record.supervisorname,
            groupname: this.props.record.groupname,
            topic: this.props.record.topic,
            coSupervisorname: this.props.record.coSupervisorname,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                supervisorname: nextProps.record.supervisorname,
                groupname: nextProps.record.groupname,
                topic: nextProps.record.topic,
                coSupervisorname: nextProps.record.coSupervisorname,
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
            $('#update-cosupervisor-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'group-update-supervisorname') {
            this.setState({ supervisorname: e.target.value });
        }
        if (e.target.id === 'group-update-groupname') {
            this.setState({ groupname: e.target.value });
        }
        if (e.target.id === 'group-update-topic') {
            this.setState({ topic: e.target.value });
        }
        if (e.target.id === 'group-update-coSupervisorname') {
            this.setState({ coSupervisorname: e.target.value });
        }
        
    };

    onSupervisorUpdate = e => {
        e.preventDefault();
        const newCoSupervisor = {
            _id: this.state.id,
            supervisorname: this.state.supervisorname,
            groupname: this.state.groupname,
            topic: this.state.topic,
            coSupervisorname: this.state.coSupervisorname,
        };
        axios
        .post("/api/cosupervisor/cosupervisor-update", newCoSupervisor)
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
                <div className="modal fade" id="update-cosupervisor-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Role</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onSupervisorUpdate} id="update-cosupervisor">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="supervisor-update-id"
                                        type="text"
                                        className="d-none"/>

                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Supervisor Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.supervisorname}
                                                id="group-update-supervisorname"
                                                type="group-update-supervisorname"
                                                error={errors.groupName}
                                                className={classnames("form-control", {
                                                    invalid: errors.supervisorname
                                                })}/>
                                            <span className="text-danger">{errors.supervisorname}</span>
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Group Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.groupname}
                                                error={errors.groupname}
                                                id="group-update-groupname"
                                                type="groupname"
                                                className={classnames("form-control", {
                                                    invalid: errors.groupname
                                                })}
                                            />
                                            <span className="text-danger">{errors.groupname}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="Student_02">Topic</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.topic}
                                                error={errors.topic}
                                                id="group-update-topic"
                                                type="topic"
                                                className={classnames("form-control", {
                                                    invalid: errors.topic
                                                })}
                                            />
                                            <span className="text-danger">{errors.topic}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="Student_02">Co-Supervisor</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.coSupervisorname}
                                                error={errors.coSupervisorname}
                                                id="group-update-coSupervisorname"
                                                type="coSupervisorname"
                                                className={classnames("form-control", {
                                                    invalid: errors.coSupervisorname
                                                })}
                                            />
                                            <span className="text-danger">{errors.coSupervisorname}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-cosupervisor"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Supervisor Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CoSupervisorUpdateModal.propTypes = {
    updatCoSupervisor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updatCoSupervisor }
)(withRouter(CoSupervisorUpdateModal));