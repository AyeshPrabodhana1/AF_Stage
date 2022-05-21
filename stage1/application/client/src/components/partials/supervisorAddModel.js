import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { addRole } from "../../actions/roleActions";
import { addSupervisor } from "../../actions/supervisorAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class SupervisorAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            supervisorname: "",
            groupname: "",
            topic:"",
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
            $('#add-supervisor-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSupervisorAdd = e => {
        e.preventDefault();
        const newSupervisor = {
            supervisorname: this.state.supervisorname,
            groupname: this.state.groupname,
            topic: this.state.topic
        };
        axios
        .post("/api/supervisor/supervisorRequest", newSupervisor)
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
                <div className="modal fade" id="add-supervisor-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Supervisor</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onSupervisorAdd} id="add-supervisor">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Supervisor Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.supervisorname}
                                                id="supervisorname"
                                                type="text"
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
                                                type="text"
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
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.topic
                                                })}
                                            />
                                            <span className="text-danger">{errors.topic}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-supervisor"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Supervisor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SupervisorAddModal.propTypes = {
    addSupervisor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addSupervisor }
)(withRouter(SupervisorAddModal));
