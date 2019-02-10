import React, { Component } from "react";
import ReactDOM from "react-dom";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import "@okta/okta-signin-widget/dist/css/okta-theme.css";

import Logo from "../../../assets/images/logo-vector.png";

export default class OktaSignInWidget extends Component {
  componentDidMount() {
    var config = {
      baseUrl: this.props.baseUrl
    };
    const el = ReactDOM.findDOMNode(this);

    this.widget = new OktaSignIn(config);
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }
  render() {
    return <div />;
  }
}
