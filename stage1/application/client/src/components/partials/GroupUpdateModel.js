import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateGroup } from "../../actions/groupAction";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class GroupUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            groupName: this.props.record.groupName,
            student_1: this.props.record.student_1,
            student_2: this.props.record.student_2,
            student_3: this.props.record.student_3,
            student_4: this.props.record.student_4,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                groupName: nextProps.record.groupName,
                student_1: nextProps.record.student_1,
                student_2: nextProps.record.student_2,
                student_3: nextProps.record.student_3,
                student_4: nextProps.record.student_4,
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
            $('#update-group-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'group-update-name') {
            this.setState({ groupName: e.target.value });
        }
        if (e.target.id === 'group-update-student_1') {
            this.setState({ student_1: e.target.value });
        }
        if (e.target.id === 'group-update-student_2') {
            this.setState({ student_2: e.target.value });
        }
        if (e.target.id === 'group-update-student_3') {
            this.setState({ student_3: e.target.value });
        }
        if (e.target.id === 'group-update-student_4') {
            this.setState({ student_4: e.target.value });
        }
        
    };

    onGroupUpdate = e => {
        e.preventDefault();
        const newGroup = {
            _id: this.state.id,
            groupName: this.state.groupName,
            student_1: this.state.student_1,
            student_2: this.state.student_2,
            student_3: this.state.student_3,
            student_4: this.state.student_4
        };
        axios
        .post("/api/groupReg/group-update", newGroup)
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
                <div className="modal fade" id="update-group-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Role</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onGroupUpdate} id="update-group">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="group-update-id"
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
                                                id="group-update-name"
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
                                            <label htmlFor="description">Student 01</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.student_1}
                                                error={errors.student_1}
                                                id="group-update-student_1"
                                                type="student_1"
                                                className={classnames("form-control", {
                                                    invalid: errors.student_1
                                                })}
                                            />
                                            <span className="text-danger">{errors.student_1}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="Student_02">Student 02</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.student_2}
                                                error={errors.student_2}
                                                id="group-update-student_2"
                                                type="student_2"
                                                className={classnames("form-control", {
                                                    invalid: errors.student_2
                                                })}
                                            />
                                            <span className="text-danger">{errors.student_2}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="student_3">Student 03</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.student_3}
                                                error={errors.student_3}
                                                id="group-update-student_3"
                                                type="student_3"
                                                className={classnames("form-control", {
                                                    invalid: errors.student_3
                                                })}
                                            />
                                            <span className="text-danger">{errors.student_3}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Student 04</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.student_4}
                                                error={errors.student_4}
                                                id="group-update-student_4"
                                                type="student_4"
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
                                    form="update-group"
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

GroupUpdateModal.propTypes = {
    updateGroup: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateGroup }
)(withRouter(GroupUpdateModal));
