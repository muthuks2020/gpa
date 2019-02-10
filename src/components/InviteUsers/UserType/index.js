import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { FormControl, Grid, Typography } from "@material-ui/core";
import SingleSelect from "../PersonalInformation/SingleSelect";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "2rem 0"
  },
  formControl: {
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
    personType: ""
  };

  componentDidMount() {
    const { mode, userTypes, handlePersonaChange } = this.props;
    if (userTypes.length === 1) {
      this.setState({
        personType: userTypes[0]
      });
      handlePersonaChange(userTypes[0]);
    }
  }

  updatePersonaChange = value => {
    const { handlePersonaChange } = this.props;
    this.setState({ personType: value.value });
    handlePersonaChange(value.value);
  };

  getModeBasedRowData = () => {
    const { personType } = this.state;
    const { classes, mode, userTypes, userType, selectedPersona } = this.props;

    switch (mode) {
      case "view":
      case "update":
        return (
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.personType}
          >
            {selectedPersona || userType}
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
            <SingleSelect
              placeholder="Select Persona"
              options={userTypes}
              onChange={this.updatePersonaChange}
            />

            {/* <InputLabel
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
            </Select> */}
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
