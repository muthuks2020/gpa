import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Typography
} from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "2rem 0"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: "50%"
  },
  rowTitle: {
    marginTop: "1rem"
  },
  personType: {
    marginTop: "1rem"
  }
});

class UserType extends React.Component {
  state = {
    personType: "",
    labelWidth: 0
  };

  componentDidMount() {
    const { mode, userTypes, handlePersonaChange } = this.props;
    if (userTypes.length === 1) {
      this.setState({
        personType: userTypes[0]
      });
      handlePersonaChange(userTypes[0]);
    }
    if (mode === "create" && userTypes.length !== 1) {
      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
      });
    }
  }

  handleChange = event => {
    const { handlePersonaChange } = this.props;
    this.setState({ personType: event.target.value });
    handlePersonaChange(event.target.value);
  };

  getUserMenuItems = () => {
    const { userTypes } = this.props;
    return userTypes.map(userType => (
      <MenuItem key={userType} value={userType}>
        {userType}
      </MenuItem>
    ));
  };

  getModeBasedRowData = () => {
    const { personType, labelWidth } = this.state;
    const { classes, mode, userTypes, userType } = this.props;
    const userTypesList = this.getUserMenuItems();

    switch (mode) {
      case "view":
      case "update":
        return (
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.personType}
          >
            {userType}
          </Typography>
        );

      case "create":
        if (userTypes.length === 1) {
          return (
            <Typography
              variant="subtitle1"
              gutterBottom
              className={classes.personType}
            >
              {userTypes[0]}
            </Typography>
          );
        }
        return (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="person-type"
            >
              Select Persona
            </InputLabel>

            <Select
              value={personType}
              onChange={event => {
                this.handleChange(event);
              }}
              input={<OutlinedInput labelWidth={labelWidth} id="person-type" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {userTypesList}
            </Select>
          </FormControl>
        );
      default:
        break;
    }
  };

  render() {
    const { classes } = this.props;
    const rowData = this.getModeBasedRowData();

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item sm={3} className={classes.rowTitle}>
            <Typography variant="subtitle1" gutterBottom>
              PERSONA TYPE
            </Typography>
          </Grid>

          <Grid item sm={4}>
            {rowData}
          </Grid>
        </Grid>
      </div>
    );
  }
}

UserType.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserType);
