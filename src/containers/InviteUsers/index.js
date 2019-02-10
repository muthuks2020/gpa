import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import { Typography, Divider, Button, Grid } from "@material-ui/core";
import camelCase from "lodash/camelCase";

import {
  PERSONAL_INFORMATION,
  USER_TYPE,
  ASSIGNMENT
} from "../../constants/features";

import PersonalInformation from "../../components/InviteUsers/PersonalInformation";
import UserType from "../../components/InviteUsers/UserType";
import DoubleAssign from "../../components/InviteUsers/Assignement/DoubleAssign";
import ConfirmationDialog from "../../common-components/ConfirmationDialog";
import Notification from "../../common-components/Notification";

import history from "../../utils/history";
import WelcomeLetter from "../../components/InviteUsers/WelcomeLetter";
import { createOktaUser, sendActivationMail } from "../../actions/user.action";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: "0 4rem 2rem 4rem"
  },
  button: {
    margin: theme.spacing.unit,
    fontSize: "1rem"
  },
  welcome: {
    display: "flex",
    justifyContent: "space-between"
  },
  viewLetter: {
    padding: "2rem 0",
    color: "#007AFF"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalWrapper: {
    position: "fixed !important",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

class InviteUsers extends React.Component {
  state = {
    userTypes: [
      "Regional Admin",
      "Harvest Planner",
      "Ranch Admin",
      "Ranch Planner"
    ],
    selectedPersona: null,
    districts: ["District 1", "District 2", "District 3", "District 4"],
    userCreated: false,
    mode: "create",
    userData: {
      userType: "Regional Admin",
      personalInformation: {
        firstName: "John",
        lastName: "Doe",
        email: "John.doe@driscolls.com"
      },
      language: "spanish"
    },
    open: false,
    showNotification: false,
    welcomeLetter: false,
    personalInformation: {}
  };

  handleCancel = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  hideNotification = visible => {
    this.setState({
      showNotification: visible
    });
  };

  onClickYes = () => {
    history.push("/home");
  };

  getInviteMessage = () => {
    const { mode } = this.props;
    return mode === "update" ? "UPDATE USER" : "";
  };

  handlePersonaChange = persona => {
    this.setState({
      selectedPersona: persona
    });
  };

  handleCreateUser = () => {
    let userObj = {
      profile: this.state.personalInformation
    };
    userObj.profile.persona = this.state.selectedPersona;
    this.props.createOktaUser(userObj);
    this.setState({
      userCreated: true,
      mode: "view",
      showNotification: true
    });
  };

  handlePersonalInformationInput = (key, value) => {
    const { personalInformation } = this.state;
    personalInformation[camelCase(key)] =
      key === "country" ? value.value : value;

    if (camelCase(key) === "email") {
      personalInformation.login = value;
    }
    this.setState({
      personalInformation: personalInformation
    });
  };

  handleSave = () => {
    const { user } = this.props;
    if (user && user["_links"]) {
      let url = `${user["_links"]["activate"]["href"]}?sendEmail=true`;
      const activationData = {
        url
      };
      this.props.sendActivationMail(activationData);
    }
    this.setState({
      userCreated: false,
      mode: "create"
    });
  };

  toggleWelcomeLetter = () => {
    this.setState({
      welcomeLetter: !this.state.welcomeLetter
    });
  };

  render() {
    const { classes, accessibleFeatures } = this.props;
    const {
      userData,
      selectedPersona,
      userCreated,
      mode,
      open,
      showNotification,
      welcomeLetter,
      personalInformation
    } = this.state;
    const inviteMessage = this.getInviteMessage();

    return (
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom color="secondary">
          {inviteMessage}
        </Typography>

        <UserType
          mode={mode}
          userTypes={accessibleFeatures[USER_TYPE]}
          userType={userData.userType}
          handlePersonaChange={this.handlePersonaChange}
          selectedPersona={selectedPersona}
        />

        <Divider />

        {selectedPersona && (
          <PersonalInformation
            mode={mode}
            personalInformation={personalInformation}
            accessibleFeatures={accessibleFeatures[PERSONAL_INFORMATION]}
            selectedPersona={selectedPersona}
            onInputChange={this.handlePersonalInformationInput}
          />
        )}
        {!userCreated && selectedPersona && (
          <div className={classes.buttonContainer}>
            <Grid
              container
              spacing={24}
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-start"
              }}
            >
              <Grid item sm={10} />

              <Button
                variant="contained"
                size="large"
                className={classes.button}
                color="primary"
                onClick={this.handleCreateUser}
              >
                CREATE USER
              </Button>
            </Grid>
          </div>
        )}
        <Notification
          hideNotification={this.hideNotification}
          open={showNotification}
        />

        {userCreated && <Divider />}

        {userCreated && (
          <div>
            <DoubleAssign
              mode="create"
              selectedPersona={selectedPersona}
              accessibleFeatures={
                accessibleFeatures[ASSIGNMENT][selectedPersona]
              }
            />

            <Divider />

            <div className={classes.welcome}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className={classes.viewLetter}
              >
                <u onClick={this.toggleWelcomeLetter}>View Welcome Letter</u>
              </Typography>
              <WelcomeLetter
                open={welcomeLetter}
                handleClose={this.toggleWelcomeLetter}
              />

              <div className={classes.buttonContainer}>
                <Button
                  variant="outlined"
                  size="large"
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleCancel}
                >
                  CANCEL
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.button}
                  color="primary"
                  onClick={this.handleSave}
                >
                  SAVE & SEND
                </Button>
                <div className={classes.modalWrapper}>
                  <ConfirmationDialog
                    modalMessage={`Are you sure you want to cancel?`}
                    modalTitle={`Cancel Invitation`}
                    open={open}
                    handleClose={this.handleClose}
                    onClickYes={this.onClickYes}
                    onClickNo={this.handleClose}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

InviteUsers.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.invitedUser
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createOktaUser, sendActivationMail }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InviteUsers));
