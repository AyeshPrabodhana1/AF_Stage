import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCoSupervisor } from "../../actions/cosupervisorAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class CoSupervisorAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            supervisorname: "",
            groupname: "",
            topic:"",
            coSupervisorname:"",
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
            $('#add-cosupervisor-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onCoSupervisorAdd = e => {
        e.preventDefault();
        const newCoSupervisor = {
            supervisorname: this.state.supervisorname,
            groupname: this.state.groupname,
            topic: this.state.topic,
            coSupervisorname:this.state.coSupervisorname
        };
        axios
        .post("/api/cosupervisor/cosupervisorRequest", newCoSupervisor)
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
                <div className="modal fade" id="add-cosupervisor-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Co-Supervisor</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onCoSupervisorAdd} id="add-co-supervisor">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Supervisor Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.supervisorname}
                                                id="supervisorname"
                                                type="supervisorname"
                                                error={errors.supervisorname}
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
                                                id="groupname"
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
                                            <label htmlFor="description">Topic</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.topic}
                                                error={errors.topic}
                                                id="topic"
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
                                            <label htmlFor="description">Co-Supervisor Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.coSupervisorname}
                                                error={errors.coSupervisorname}
                                                id="coSupervisorname"
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
                                    form="add-co-supervisor"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Co-Supervisor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CoSupervisorAddModal.propTypes = {
    addCoSupervisor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addCoSupervisor }
)(withRouter(CoSupervisorAddModal));
