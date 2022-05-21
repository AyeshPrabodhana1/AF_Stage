import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateSubmissionType } from "../../actions/submissionTypeActions";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class SubmissionTypeUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            description: this.props.record.description,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                name: nextProps.record.name,
                description: nextProps.record.description
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
            $('#update-submissionType-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'submissionType-update-name') {
            this.setState({ name: e.target.value });
        }
        if (e.target.id === 'submissionType-update-description') {
            this.setState({ description: e.target.value });
        }
    };

    onSubmissionTypeUpdate = e => {
        e.preventDefault();
        const newSubmissionType = {
            _id: this.state.id,
            name: this.state.name,
            description: this.state.description
        };
        // this.props.updateSubmissionType(newSubmissionType);
        axios
        .post("/api/submissionType/submissionType-update", newSubmissionType)
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
                <div className="modal fade" id="update-submissionType-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Submission Type</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onSubmissionTypeUpdate} id="update-submissionType">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="submissionType-update-id"
                                        type="text"
                                        className="d-none"/>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="submissionType-update-name"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.name
                                                })}/>
                                            <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="description">Description</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.description}
                                                error={errors.description}
                                                id="submissionType-update-description"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.description
                                                })}
                                            />
                                            <span className="text-danger">{errors.description}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-submissionType"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Submission Type
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

SubmissionTypeUpdateModal.propTypes = {
    updateSubmissionType: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { updateSubmissionType }
)(withRouter(SubmissionTypeUpdateModal));
