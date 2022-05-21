import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addGroup } from "../../actions/groupAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';

import 'react-toastify/dist/ReactToastify.css';

class GroupAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            groupName: "",
            student_1: "",
            student_2: "",
            student_3: "",
            student_4: "",
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
            $('#add-group-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onGroupAdd = e => {
        e.preventDefault();
        const newGroup = {
            groupName: this.state.groupName,
            student_1: this.state.student_1,
            student_2: this.state.student_2,
            student_3: this.state.student_3,
            student_4: this.state.student_4
        };
        this.props.addGroup(newGroup, this.props.history);
    };

    render() {
        const { errors } = this.state;
        return (
            <div>
                <div className="modal fade" id="add-group-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">New Group</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onGroupAdd} id="add-group">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Group Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.groupName}
                                                id="groupName"
                                                type="text"
                                                error={errors.groupName}
                                                className={classnames("form-control", {
                                                    invalid: errors.groupName
                                                })}/>
                                            <span className="text-danger">{errors.groupName}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Member 01</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.student_1}
                                                error={errors.student_1}
                                                id="student_1"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.student_1
                                                })}
                                            />
                                            <span className="text-danger">{errors.student_1}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Member 02</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.student_2}
                                                error={errors.student_2}
                                                id="student_2"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.student_2
                                                })}
                                            />
                                            <span className="text-danger">{errors.student_2}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Member 03</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.student_3}
                                                error={errors.student_3}
                                                id="student_3"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.student_3
                                                })}
                                            />
                                            <span className="text-danger">{errors.student_3}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="email">Member 04</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.student_4}
                                                error={errors.student_4}
                                                id="student_4"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.student_4
                                                })}
                                            />
                                            <span className="text-danger">{errors.student_4}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-group"
                                    type="submit"
                                    className="btn btn-primary">
                                    Register your group
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

GroupAddModal.propTypes = {
    addGroup: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { addGroup }
)(withRouter(GroupAddModal));
