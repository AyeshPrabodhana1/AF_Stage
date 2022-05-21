import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../partials/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { Link } from "react-router-dom";

class DashboardStudent extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        //const { user } = this.props.auth;
        return (
            <div>
                <Navbar />
                <div className="hero-image" id="banner_image">
                    <div className="hero-text" id="text_banner">
                        <p>RESEARCH HUB</p>
                       </div>
                    <div className="hero-text" id="text_banner2">
                        <p>Research is seeing what everybody else has seen and <br/>thinking what nobody else has thought.</p>
                    </div>
                </div>
                <div className="row" id="row_home">
                    <div className="col-sm-5" id="col_left_row1">
                    <div className="hero-text" id="text_row">
                        <p>Let's Get Registered</p>
                       </div>
                        <br />
                        <p>Front-end skills are in high demand, and plenty of people know HTML and CSS. Set yourself apart by building a foundation in JavaScript. Then create interactive applications with React — a popular library thats becoming more and more essential to know. To start this Skill Path, sign up for Codecademy Pro.</p><br />
                        <Link to="/groups" className="btn btn-primary" id="co_supervisor">Register Your Group</Link>
                    </div>

                    <div className="col-sm-7">
                        <img
                            className="d-block" id="row_image_1"
                            src={require('../../images/group1.png')}
                            alt="First slide"
                        />
                    </div>
                </div>

                <div className="row" id="row_home2">
                    <div className="col-sm-7">
                        <img
                            className="d-block" id="row_image_2"
                            src={require('../../images/topic.png')}
                            alt="First slide"
                        />
                    </div>
                    <div className="col-sm-5" id="col_left_row2">
                    <div className="hero-text" id="text_row">
                        <p>Let's Get Registered</p>
                       </div>
                        <br />
                        <p>Front-end skills are in high demand, and plenty of people know HTML and CSS. Set yourself apart by building a foundation in JavaScript. Then create interactive applications with React — a popular library thats becoming more and more essential to know. To start this Skill Path, sign up for Codecademy Pro.</p><br />
                        <Link to="/topic" className="btn btn-primary" id="co_supervisor">Register Your Topic</Link>
                    </div>

                </div>

                <div className="row" id="row_home">
                    <div className="col-sm-5" id="col_left_row1">
                    <div className="hero-text" id="text_row">
                        <p>Request your Supervisor</p>
                       </div>
                        <br />
                        <p>The key role of a research degree supervisor is to assist and support a student throughout their academic studies. Duties and Key Responsibilities: Ensuring compliance with all College policies and regulations, including the key policies and procedures relating to supervision and examination.</p><br />
                        <Link to="/supervisor" className="btn btn-primary" id="co_supervisor">Invite Your Supervisor</Link>
                    </div>

                    <div className="col-sm-7">
                        <img
                            className="d-block" id="row_image_3"
                            src={require('../../images/co.png')}
                            alt="First slide"
                        />
                    </div>
                </div>


                <div className="row" id="row_home2">
                    <div className="col-sm-7">
                        <img
                            className="d-block" id="row_image_4"
                            src={require('../../images/supervisor.jpg')}
                            alt="First slide"
                        />
                    </div>
                    <div className="col-sm-5" id="col_left_row2">
                    <div className="hero-text" id="text_row">
                        <p>Request your co-Supervisor</p>
                       </div>
                        <br />
                        <p>
                            Co-supervisor has responsibility to check quality of research work and guide the student to
                             enhance quality of thesis. In some cases where mentorship is involved, the main supervisor 
                             carries a role of an oversight on progress and quality of supervision being conducted by the
                              co-supervisor.
                        </p>
                        <br />
                        <Link to="/users" className="btn btn-primary" id="co_supervisor">Invite Your Co-Supervisor</Link>
                    </div>

                </div>

            </div>
        );
    }
}

DashboardStudent.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(DashboardStudent);
