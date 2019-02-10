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
    marginTop: "8%"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "36rem",
    width: "33rem"
  },
  image: { height: 200 },
  header: { marginTop: -50, marginBottom: 40 },

  textField: {
    minWidth: "65%",
    padding: theme.spacing.unit * 0.8,
    minHeight: 5,
    marginTop: -10
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
            className={classes.textField}
            defaultValue="john.doe@gmail.com"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-bare"
            className={classes.textField}
            placeholder="New Password"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-bare"
            className={classes.textField}
            placeholder="Confirm Password"
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
                state: { mode: "register" }
              })
            }
          >
            Done
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
