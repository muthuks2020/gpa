import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import configureStore from "./store";
import history from "../src/utils/history";
import authWrapper from "./common-components/auth-wrapper";

//MuiTheme
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

//import Containers
import Login from "./containers/Login/Login";
import SignOn from "../src/components/SignOn";
import Home from "../src/components/NavList";
import Register from "../src/containers/Register";
import "../dist/main.css";

import { USER_AUTH_SUCCESS } from "./constants";

const store = configureStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FDDA24"
    },
    secondary: {
      main: "#4A773C",
      contrastText: "#fff"
    },
    other: {
      main: "#6F5091"
    }
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "#4A773C"
      },
      raisedSecondary: {
        color: "#fff"
      }
    }
  },
  fontFamily: "Mark OT"
});

if (localStorage.getItem("user")) {
  store.dispatch({
    type: USER_AUTH_SUCCESS,
    user: localStorage.getItem("user")
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route path="/home" component={authWrapper(Home)} />
          <Route path="/register" component={Register} />
          <Route path="/signon" component={SignOn} />
          <Route path="/" exact component={Login} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
