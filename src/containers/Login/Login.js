import React, { Component } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Logo from "../../../assets/images/logo-vector.png";
import "./login.css";
import history from "../../utils/history";
import { login } from "../../actions/auth.action";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.widget = new OktaSignIn({
      baseUrl: "https://dev-262954.oktapreview.com",
      logo: Logo,
      clientId: "0oaj20bx0n2GgyQHa0h7",
      redirectUri: "http://localhost:8080/home",
      authParams: {
        issuer: "default",
        responseType: "id_token"
      }
    });
  }

  componentDidMount = () => {
    let _this = this;
    this.widget.session.get(response => {
      console.log(this.props.user);
      if (response.status !== "INACTIVE" && this.props.user) {
        _this.setState({ user: response.login });
        _this.props.login(response.login);
      } else {
        _this.showLogin();
      }
    });
    if (this.state.user) {
      console.log(this.state.user);
      this.props.login(this.state.user);
    }
  };

  showLogin = () => {
    let _this = this;
    Backbone.history.stop();
    this.widget.renderEl(
      { el: _this.loginContainer },
      response => {
        console.log(response);
        _this.setState({ user: response.claims.email });
        _this.props.login(response.claims.email);
      },
      err => {
        console.log(err);
      }
    );
  };

  logout = () => {
    this.widget.signOut(() => {
      this.setState({ user: null });
      this.showLogin();
    });
  };

  render() {
    // document.body.style = "background: #FDDA24;";
    const { user } = this.state;
    return (
      <div className="login-container">
        {user ? null : (
          <div
            ref={div => {
              this.loginContainer = div;
            }}
          />
        )}
        <div
          style={{
            flex: 1,
            position: "fixed",
            bottom: "0",
            right: "0",
            color: "#4a773c",
            marginRight: "1rem",
            marginBottom: "1rem"
          }}
        >
          V 0.01
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
