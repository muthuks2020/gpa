import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Divider,
  Button,
  TextField
} from "@material-ui/core";

import SelectLanguage from "../../components/InviteUsers/PersonalInformation/SelectLanguage";
import NavBar from "../../containers/NavBar";
import AssignmentSelectItem from "../../common-components/AssignmentSelectItem";
import history from "../../utils/history";
import SingleSelect from "../../components/InviteUsers/PersonalInformation/SingleSelect";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "4%",
    marginTop: "6rem"
  },
  containerAssign: { margin: "3%" },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginRight: theme.spacing.unit,
    marginTop: "0.35rem",
    height: "3rem"
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  rowTitle: {
    marginTop: "1rem"
  },
  defaultText: {
    marginLeft: "1rem"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "80%",
    height: "2.8rem"
  },
  buttonContainer: {
    flexGrow: 1,
    margin: "0 0 2rem 2rem"
  },
  button: {
    margin: theme.spacing.unit
  },
  assignment: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class PersonalInformation extends React.Component {
  state = {
    labelWidth: 0,
    selectedCountry: "",
    userData: {
      userType: "Regional Admin",
      personalInformation: {
        firstName: "John",
        lastName: "Doe",
        email: "John.doe@driscolls.com",
        organization: "Driscolls",
        country: "Mexico",
        phoneNo: "+44 - 55 - 123456",
        language: "English",
        Status: "ACTIVE"
      },
      assignments: [
        // {
        //   districtName: "District 1",
        //   companies: {
        //     Company1: [],
        //     Company2: []
        //   }
        // },
        // {
        //   districtName: "District 2",
        //   companies: {
        //     Company3: [],
        //     Company4: []
        //   }
        // }
      ],
      language: "spanish"
    },
    assignments: [
      { Jocotepec: [] },
      { "Northern California": [] },
      { "Pacific North West": [] }
    ]
  };

  getAssignmentTree = () => {
    const { classes } = this.props;
    const { mode, personalInformation } = this.props.location.state;

    return (
      <div className={classes.assignment}>
        {personalInformation.assignments &&
          personalInformation.assignments.map(assignment => (
            <AssignmentSelectItem
              key={Object.keys(assignment)[0]}
              assignmentData={assignment}
              mode="view"
              // assignments.persona === "Harvest Planner" ? "create" : "view"
            />
          ))}
      </div>
    );
  };

  getHeader = () => {
    const { mode } = this.props.location.state;
    switch (mode) {
      case "profile":
        return "View Profile";
      case "register":
        return "Register";
      case "update":
        return "Update User";
      default:
        break;
    }
    console.log(mode);
    const message =
      mode === "profile"
        ? "View Profile"
        : mode === "register"
        ? "Register"
        : "View User";
    return message;
  };

  render() {
    console.log(this.props);
    const { userData } = this.state;
    const { mode, personalInformation } = this.props.location.state;
    const { classes } = this.props;
    const assignmentTree = this.getAssignmentTree();
    const header = this.getHeader();
    const titleList = [
      "Controller/Accountant",
      "Grower Owner",
      "President",
      "Production Assistant",
      "Ranch Assistant",
      "Ranch Foreman",
      "Ranch Manager",
      "Truck Driver",
      "Other"
    ];
    return (
      <div>
        <NavBar />
        <div className={classes.root}>
          <Typography variant="h6" gutterBottom color="secondary">
            {header}
          </Typography>

          {mode !== "register" && (
            <div style={{ marginTop: "4%", marginBottom: "2%" }}>
              <Grid container spacing={24}>
                <Grid item sm={3}>
                  <Typography variant="subtitle1" gutterBottom>
                    PERSONA TYPE
                  </Typography>
                </Grid>
                <Grid item sm={9}>
                  <Grid container>
                    <Grid item sm={3}>
                      {personalInformation.persona_type}
                    </Grid>
                    <Grid item sm={3} />
                    {mode === "update" && (
                      <Grid item sm={5}>
                        <Grid container>
                          <Grid item sm={6} style={{ marginLeft: "0.6rem" }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Status
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              style={{ color: "#6F5091" }}
                            >
                              {personalInformation.status}
                            </Typography>
                          </Grid>
                          <Grid item sm={5}>
                            <Typography
                              variant="subtitle1"
                              gutterBottom
                              style={{
                                textDecoration: "underline",
                                color: "#007AFF"
                              }}
                            >
                              Deactivate User
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}

          {mode !== "register" && <Divider style={{ marginBottom: "2%" }} />}
          <Grid container spacing={24}>
            <Grid item xs={3} sm={3} className={classes.rowTitle}>
              <Typography variant="subtitle1" gutterBottom>
                PERSONAL INFORMATION
              </Typography>
            </Grid>

            <Grid item xs={9} sm={9}>
              <form className={classes.container} autoComplete="off">
                <Grid container spacing={24}>
                  <Grid item sm={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      FIRST NAME
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {personalInformation.firstName}
                    </Typography>
                  </Grid>

                  {mode === "update" ? (
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" gutterBottom>
                        LAST NAME
                      </Typography>
                      <TextField
                        id="outlined-bare"
                        className={classes.textField}
                        margin="none"
                        variant="outlined"
                        placeholder={personalInformation.lastName}
                      />
                    </Grid>
                  ) : (
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" gutterBottom>
                        LAST NAME
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {personalInformation.lastName}
                      </Typography>
                    </Grid>
                  )}

                  <Grid item sm={5}>
                    <Typography variant="subtitle2" gutterBottom>
                      EMAIL
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {personalInformation.email}
                    </Typography>
                  </Grid>

                  {mode !== "profile" ? (
                    <Grid item sm={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        PHONE NUMBER
                      </Typography>
                      <Grid container>
                        <Grid
                          item
                          sm={1}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#9e9e9e"
                          }}
                        >
                          +
                        </Grid>
                        <Grid item sm={2}>
                          <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            placeholder="44"
                          />
                        </Grid>
                        <Grid item sm={3}>
                          <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            placeholder="888"
                          />
                        </Grid>
                        <Grid item sm={5}>
                          <TextField
                            id="outlined-bare"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            placeholder="88888"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" gutterBottom>
                        PHONE NUMBER
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {personalInformation.phoneNo}
                      </Typography>
                    </Grid>
                  )}

                  {/* <Grid item sm={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Organization
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {userData.personalInformation.organization}
                    </Typography>
                  </Grid> */}

                  {personalInformation.persona_type === "Ranch Admin" &&
                  mode !== "profile" ? (
                    <Grid item sm={4}>
                      <Typography variant="subtitle2" gutterBottom>
                        JOB TITLE
                      </Typography>

                      <SingleSelect
                        placeholder="Select Job Title"
                        options={titleList}
                        classes={classes.textField}
                      />
                    </Grid>
                  ) : personalInformation.persona_type === "Ranch Admin" ? (
                    <Grid item sm={3}>
                      <Typography variant="subtitle2" gutterBottom>
                        JOB TITLE
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {personalInformation.jobTitle}
                      </Typography>
                    </Grid>
                  ) : (
                    ""
                  )}

                  <Grid item sm={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      COUNTRY
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {personalInformation.country}
                    </Typography>
                  </Grid>

                  {mode !== "profile" ? (
                    <Grid item sm={5}>
                      <div>
                        <Typography
                          variant="subtitle2"
                          style={{ marginBottom: -15 }}
                        >
                          PREFERRED LANGUAGE
                        </Typography>
                        <SelectLanguage />
                      </div>
                    </Grid>
                  ) : (
                    <Grid item sm={5}>
                      <Typography variant="subtitle2" gutterBottom>
                        PREFERRED LANGUAGE
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        {personalInformation.language}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Grid>
          </Grid>
        </div>
        <Divider style={{ margin: "0 3rem 0 3rem" }} />
        <div className={classes.containerAssign}>
          <Grid container spacing={24}>
            <Grid item sm={3} className={classes.rowTitle}>
              <Typography variant="subtitle1" gutterBottom>
                {personalInformation.assignmentLabel}
              </Typography>
            </Grid>

            <Grid item sm={9}>
              {assignmentTree}
            </Grid>
          </Grid>
        </div>
        <div className={classes.buttonContainer}>
          <Grid container spacing={24}>
            <Grid item sm={3} />

            <Button
              variant="outlined"
              size="large"
              color="secondary"
              className={classes.button}
              style={{ marginLeft: "1rem", minWidth: "10%" }}
            >
              CANCEL
            </Button>

            {mode === "register" ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                style={{ minWidth: "10%" }}
                onClick={() =>
                  history.push({
                    pathname: "/register",
                    state: {
                      mode: "profile",
                      personalInformation: {
                        persona_type: personalInformation.persona_type,
                        firstName: personalInformation.firstName,
                        lastName: personalInformation.lastName,
                        email: personalInformation.email,
                        phoneNo: personalInformation.phoneNo,
                        country: personalInformation.country,
                        language: personalInformation.language,
                        country: personalInformation.country,
                        status: personalInformation.status,
                        assignments: personalInformation.assignments,
                        assignmentLabel: personalInformation.assignmentLabel,
                        jobTitle: personalInformation.jobTitle
                      }
                    }
                  })
                }
              >
                <Typography color="secondary">SAVE</Typography>
              </Button>
            ) : personalInformation.persona_type === "Harvest Planner" ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                style={{ minWidth: "10%" }}
              >
                <Typography color="secondary">UPDATE</Typography>
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                style={{ minWidth: "10%" }}
                onClick={() => history.push("/home")}
              >
                <Typography color="secondary">UPDATE</Typography>
              </Button>
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

PersonalInformation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonalInformation);
