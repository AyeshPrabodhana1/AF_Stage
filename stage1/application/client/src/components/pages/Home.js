import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <div className="hero-image" id="home_image">
                    <div className="hero-text" id="text_home">
                        <p>RESEARCH HUB</p>
                    </div>
                    <div className="hero-text" id="text_banner2">
                    </div>
                    <div className="row">
                        <div className="col-sm-6" id="col_left_Login_btn">
                            <Link to="/groups" className="btn btn-primary" id="admin_btn_left">ADMIN LOGIN</Link>
                        </div>
                        <div className="col-sm-6" id="col_right_Login_btn">
                            <Link to="/login_student" className="btn btn-primary" id="admin_btn_right">STUDENT LOGIN</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(Home);
