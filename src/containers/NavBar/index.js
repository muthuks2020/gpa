import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { PersonOutline } from "@material-ui/icons";

import { logout } from "../../actions/auth.action";
import Logo from "../../../assets/images/logo-vector.svg";
import history from "../../utils/history";
// import NavList from "../../components/NavList";

const styles = theme => ({
  root: {
    width: "100%"
  },
  title: {
    flexGrow: 1,
    marginLeft: 20,
    letterSpacing: "1px"
  },
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "80px",
    paddingLeft: "30px",
    paddingRight: "20px"
  },
  icon: {
    fontSize: "3rem"
  },
  sectionDesktop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  }
});

class NavBar extends React.Component {
  state = {
    anchorEl: null
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.logout();
    this.handleClose();
  };

  getName = () => {
    let fName = localStorage.getItem("fName");
    let lName = localStorage.getItem("lName");
    return `${fName} ${lName}`;
  };

  handleLogoClick = () => {
    history.push("/home");
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const name = this.getName();
    const persona = localStorage.getItem("persona");
    return (
      <div className={classes.root}>
        <AppBar position="fixed" theme={theme} className={classes.appBar}>
          <img
            onClick={this.handleLogoClick}
            style={{ cursor: "pointer" }}
            src={Logo}
          />
          <Typography
            className={classes.title}
            variant="h6"
            color="secondary"
            noWrap
          >
            GROWER PORTAL
          </Typography>

          <div className={classes.sectionDesktop}>
            {/* <IconButton color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsNone className={classes.icon} color="secondary" />
              </Badge>
            </IconButton> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: ""
              }}
            >
              <Typography color="secondary" variant="subtitle1">
                {name}
              </Typography>
              <Typography color="secondary" variant="subtitle2" gutterBottom>
                {persona}
              </Typography>
            </div>
            <IconButton
              color="inherit"
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
            >
              <PersonOutline className={classes.icon} color="secondary" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logout }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
