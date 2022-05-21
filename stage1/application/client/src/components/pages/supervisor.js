import React, { Component, Fragment } from "react";
import Navbar from "../partials/Navbar";
import ReactDatatable from '@ashvin27/react-datatable';
import PropTypes from "prop-types";
import axios from "axios";
import SupervisorAddModal from "../partials/supervisorAddModel";
// import RoleUpdateModal from "../partials/RoleUpdateModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { connect } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

class Supervisor extends Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                key: "_id",
                text: "Id",
                className: "id",
                align: "left",
                sortable: true,
            },
            {
                key: "supervisorname",
                text: "Supervisor",
                className: "supervisorname",
                align: "left",
                sortable: true,
            },
            {
                key: "groupname",
                text: "Group Name",
                className: "groupname",
                align: "left",
                sortable: true
            },
            {
                key: "topic",
                text: "Topic",
                className: "topic",
                align: "left",
                sortable: true
            },
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                data-toggle="modal"
                                data-target="#update-role-modal"
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{ marginRight: '5px' }}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            filename: "Supervisor",
            no_data_text: 'No role found!',
            button: {
                excel: true,
                print: true,
                csv: true
            },
            language: {
                length_menu: "Show _MENU_ result per page",
                filter: "Filter in records...",
                info: "Showing _START_ to _END_ of _TOTAL_ records",
                pagination: {
                    first: "First",
                    previous: "Previous",
                    next: "Next",
                    last: "Last"
                }
            },
            show_length_menu: true,
            show_filter: true,
            show_pagination: true,
            show_info: true,
        };

        this.state = {
            records: []
        };

        this.state = {
            currentRecord: {
                id: '',
                supervisorname: '',
                groupname: '',
                topic:''
                
            }
        };

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData()
    };

    componentWillReceiveProps(nextProps) {
        this.getData()
    }

    getData() {
        axios
            .post("/api/supervisor/supervisor-data")
            .then(res => {
                this.setState({ records: res.data })
            })
            .catch()
    }

    editRecord(record) {
        this.setState({ currentRecord: record });
    }

    deleteRecord(record) {
        axios
            .post("/api/role/role-delete", { _id: record._id })
            .then(res => {
                if (res.status === 200) {
                    toast(res.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                    })
                }
            })
            .catch();
        this.getData();
    }

    pageChange(pageData) {
        console.log("OnPageChange", pageData);
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="hero-image" id="Supervisor_image">
                    <div className="hero-text" id="text_group">
                        <p>Invite Your Supervisor</p>
                    </div>
                </div>
                <div className="d-flex" id="wrapper">
                    <SupervisorAddModal />
                    {/* <RoleUpdateModal record={this.state.currentRecord} /> */}
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <button className="btn btn-outline-primary float-right mt-3 mr-2" data-toggle="modal" data-target="#add-supervisor-modal"><FontAwesomeIcon icon={faPlus} />Invite Supervisor</button>
                            <ReactDatatable
                                config={this.config}
                                records={this.state.records}
                                columns={this.columns}
                                onPageChange={this.pageChange.bind(this)}
                            />
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        );
    }

}

Supervisor.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Supervisor);
