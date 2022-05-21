import React from 'react'
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify';
import $ from 'jquery';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';

class MarkingUpdateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.record.id,
            name: this.props.record.name,
            description: this.props.record.description,
            type: this.props.record.type,
            criticalAnalysis: this.props.record.criticalAnalysis,
            concept: this.props.record.concept,
            scope: this.props.record.scope,
            technicalAccuracy: this.props.record.technicalAccuracy,
            theory: this.props.record.theory,
            referencing: this.props.record.referencing,
            presentation: this.props.record.presentation,
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record) {
            this.setState({
                id: nextProps.record.id,
                name: nextProps.record.name,
                description: nextProps.record.description,
                type: nextProps.record.type,
                criticalAnalysis: nextProps.record.criticalAnalysis,
                concept: nextProps.record.concept,
                scope: nextProps.record.scope,
                technicalAccuracy: nextProps.record.technicalAccuracy,
                theory: nextProps.record.theory,
                referencing: nextProps.record.referencing,
                presentation: nextProps.record.presentation
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
            $('#update-marking-modal').modal('hide');
            toast(nextProps.auth.user.data.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    onChange = e => {
        if (e.target.id === 'marking-update-name') {
            this.setState({ name: e.target.value });
        }
        if (e.target.id === 'marking-update-description') {
            this.setState({ description: e.target.value });
        }
        if (e.target.id === 'marking-update-type') {
            this.setState({ type: e.target.value });
        }
        if (e.target.id === 'marking-update-criticalAnalysis') {
            this.setState({ criticalAnalysis: e.target.value });
        }
        if (e.target.id === 'marking-update-concept') {
            this.setState({ concept: e.target.value });
        }
        if (e.target.id === 'marking-update-scope') {
            this.setState({ scope: e.target.value });
        }
        if (e.target.id === 'marking-update-technicalAccuracy') {
            this.setState({ technicalAccuracy: e.target.value });
        }
        if (e.target.id === 'marking-update-theory') {
            this.setState({ theory: e.target.value });
        }
        if (e.target.id === 'marking-update-referencing') {
            this.setState({ referencing: e.target.value });
        }
        if (e.target.id === 'marking-update-presentation') {
            this.setState({ presentation: e.target.value });
        }
    };

    onMarkingUpdate = e => {
        e.preventDefault();
        const newMarking = {
            _id: this.state.id,
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
        .post("/api/marking/marking-update", newMarking)
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
                <div className="modal fade" id="update-marking-modal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Marking</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form noValidate onSubmit={this.onMarkingUpdate} id="update-marking">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.id}
                                        id="marking-update-id"
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
                                                id="marking-update-name"
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
                                            <label htmlFor="type">Type</label>
                                        </div>
                                        <div className="col-md-9">
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.type}
                                                error={errors.type}
                                                id="marking-update-type"
                                                type="type"
                                                className={classnames("form-control", {
                                                    invalid: errors.type
                                                })}
                                            />
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
                                                id="marking-update-description"
                                                type="description"
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
                                                error={errors.criticalAnalysis}
                                                id="marking-update-criticalAnalysis"
                                                type="criticalAnalysis"
                                                className={classnames("form-control", {
                                                    invalid: errors.criticalAnalysis
                                                })}
                                            />
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
                                                error={errors.concept}
                                                id="marking-update-concept"
                                                type="concept"
                                                className={classnames("form-control", {
                                                    invalid: errors.concept
                                                })}
                                            />
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
                                                error={errors.scope}
                                                id="marking-update-scope"
                                                type="scope"
                                                className={classnames("form-control", {
                                                    invalid: errors.scope
                                                })}
                                            />
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
                                                error={errors.technicalAccuracy}
                                                id="marking-update-technicalAccuracy"
                                                type="technicalAccuracy"
                                                className={classnames("form-control", {
                                                    invalid: errors.technicalAccuracy
                                                })}
                                            />
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
                                                error={errors.theory}
                                                id="marking-update-theory"
                                                type="theory"
                                                className={classnames("form-control", {
                                                    invalid: errors.theory
                                                })}
                                            />
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
                                                error={errors.referencing}
                                                id="marking-update-referencing"
                                                type="referencing"
                                                className={classnames("form-control", {
                                                    invalid: errors.referencing
                                                })}
                                            />
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
                                                error={errors.presentation}
                                                id="marking-update-presentation"
                                                type="presentation"
                                                className={classnames("form-control", {
                                                    invalid: errors.presentation
                                                })}
                                            />
                                            <span className="text-danger">{errors.presentation}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button
                                    form="update-marking"
                                    type="submit"
                                    className="btn btn-primary">
                                    Update Marking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MarkingUpdateModal.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(withRouter(MarkingUpdateModal));
