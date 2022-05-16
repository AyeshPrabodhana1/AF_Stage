import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class MarkingAddModal extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            type: '',
            description: '',
            criticalAnalysis: '',
            concept: '',
            scope: '',
            technicalAccuracy: '',
            theory: '',
            referencing: '',
            presentation: '',
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
            $('#add-marking-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onMarkingAdd = e => {
        e.preventDefault();
        const newMarking = {
            name: this.state.name,
            description: this.state.description,
            type: this.state.type,
            criticalAnalysis: this.state.criticalAnalysis,
            concept: this.state.concept,
            scope: this.state.scope,
            technicalAccuracy: this.state.technicalAccuracy,
            theory: this.state.theory,
            referencing: this.state.referencing,
            presentation: this.state.presentation
        };
        axios
            .post("/api/marking/marking-add", newMarking)
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
                <div className="modal fade" id="add-marking-modal" data-reset="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Add Marking</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onMarkingAdd} id="add-marking">
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="name">Name</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.name}
                                                id="name"
                                                type="text"
                                                error={errors.name}
                                                className={classnames("form-control", {
                                                    invalid: errors.name
                                                })} />
                                            <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="type">Type</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.type}
                                                id="type"
                                                type="text"
                                                error={errors.type}
                                                className={classnames("form-control", {
                                                    invalid: errors.type
                                                })} />
                                            <span className="text-danger">{errors.type}</span>
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
                                                id="description"
                                                type="text"
                                                className={classnames("form-control", {
                                                    invalid: errors.description
                                                })}
                                            />
                                            <span className="text-danger">{errors.description}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="criticalAnalysis">Critical Analysis</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.criticalAnalysis}
                                                id="criticalAnalysis"
                                                type="text"
                                                error={errors.criticalAnalysis}
                                                className={classnames("form-control", {
                                                    invalid: errors.criticalAnalysis
                                                })} />
                                            <span className="text-danger">{errors.criticalAnalysis}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="concept">Concept</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.concept}
                                                id="concept"
                                                type="text"
                                                error={errors.concept}
                                                className={classnames("form-control", {
                                                    invalid: errors.concept
                                                })} />
                                            <span className="text-danger">{errors.concept}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="scope">Scope</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.scope}
                                                id="scope"
                                                type="text"
                                                error={errors.scope}
                                                className={classnames("form-control", {
                                                    invalid: errors.scope
                                                })} />
                                            <span className="text-danger">{errors.scope}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="technicalAccuracy">Technical Accuracy</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.technicalAccuracy}
                                                id="technicalAccuracy"
                                                type="text"
                                                error={errors.technicalAccuracy}
                                                className={classnames("form-control", {
                                                    invalid: errors.technicalAccuracy
                                                })} />
                                            <span className="text-danger">{errors.technicalAccuracy}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="theory">Theory</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.theory}
                                                id="theory"
                                                type="text"
                                                error={errors.theory}
                                                className={classnames("form-control", {
                                                    invalid: errors.theory
                                                })} />
                                            <span className="text-danger">{errors.theory}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="referencing">Referencing</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.referencing}
                                                id="referencing"
                                                type="text"
                                                error={errors.referencing}
                                                className={classnames("form-control", {
                                                    invalid: errors.referencing
                                                })} />
                                            <span className="text-danger">{errors.referencing}</span>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-3">
                                            <label htmlFor="presentation">Presentation</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.presentation}
                                                id="presentation"
                                                type="text"
                                                error={errors.presentation}
                                                className={classnames("form-control", {
                                                    invalid: errors.presentation
                                                })} />
                                            <span className="text-danger">{errors.presentation}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="add-marking"
                                    type="submit"
                                    className="btn btn-primary">
                                    Add Marking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MarkingAddModal.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(withRouter(MarkingAddModal));
