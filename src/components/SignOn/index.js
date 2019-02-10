import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, TextField, Button } from "@material-ui/core/";
import Logo from "../../../assets/images/logo-vector.svg";

import history from "../../utils/history";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "30rem",
    width: "32rem"
  },
  image: { height: 200 },
  header: { marginTop: -35 },

  textField: {
    marginTop: 3 * theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: "65%",
    padding: theme.spacing.unit * 2,
    minHeight: 5
  },
  button: {
    marginTop: 8,
    minWidth: "65%",
    minHeight: "10%"
  }
});

class Demo extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    document.body.style = "background: #FDDA24;";

    return (
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <img src={Logo} className={classes.image} />
          <Typography variant="h4" color="secondary" className={classes.header}>
            GROWER PORTAL
          </Typography>
          <TextField
            id="outlined-bare"
            disabled
            className={classes.textField}
            defaultValue="john.Doe@driscolls.com"
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() =>
              history.push({
                pathname: "/register",
                state: {
                  mode: "register",
                  personalInformation: {
                    persona: "Regional Admin",
                    firstName: "Jane",
                    lastName: "Doe"
                  }
                }
              })
            }
          >
            Register
          </Button>
        </Paper>
      </div>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Demo);
