import React, { Component } from "react";
import { Button, Grid, FormControl, Typography } from "@material-ui/core/";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import MultiSelect from "../InviteUsers/PersonalInformation/MultiSelect";

const styles = theme => ({
  root: {
    marginLeft: "5px",
    marginRight: "5px",
    display: "flex",
    justifyContent: "space-evenly",
    alignItmes: "center"
  },
  button: {
    maxHeight: "40px",
    minHeight: "40px"
  },
  buttonContainer: {
    flex: 2,
    // margin: "0 0 1rem 0",
    display: "flex",
    alignItmes: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150
  },
  textFieldContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItmes: "center"
  },
  formControl: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    minWidth: "100%"
  }
});

class CustomToolBar extends Component {
  state = { status: this.props.filterTypes[0] };

  handleFilterPersona = item => {
    this.setState({ status: item });
  };

  render() {
    const { classes, filterTypes, persona } = this.props;
    const { status } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.buttonContainer}>
          {filterTypes.map(item => {
            return (
              <Button
                variant={item === status ? "contained" : null}
                color={item === status ? "secondary" : null}
                size="small"
                key={item}
                className={classes.button}
                onClick={() => this.handleFilterPersona(item)}
              >
                <Typography style={{ fontSize: 12, color: "#9e9e9e" }}>
                  {item}
                </Typography>
              </Button>
            );
          })}
        </div>
        <div className={classes.textFieldContainer}>
          {persona === "Super Admin" && (
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <MultiSelect
                  placeholder="View By Distrct"
                  options={["Borders", "Avon", "Cambridge", "Berkashire"]}
                  customStyles={customStyles}
                />
              </FormControl>
            </Grid>
          )}
        </div>
      </div>
    );
  }
}

CustomToolBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomToolBar);

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "gray" : "",
    padding: 20,
    borderRadius: 2
  }),
  control: (base, state) => ({
    ...base,
    minHeight: "35px",
    "&:hover": { borderColor: "#FDDA24", transition: "opacity 1000ms" },
    boxShadow: "none"
  }),
  menu: base => ({
    ...base,
    zIndex: 100
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 800ms";

    return { ...provided, opacity, transition };
  }
};
