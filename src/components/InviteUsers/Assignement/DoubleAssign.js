import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  FormControl,
  IconButton,
  Grid,
  Typography,
  Paper
} from "@material-ui/core";

import Select from "react-select";
import makeAnimated from "react-select/lib/animated";

import { AddCircleTwoTone, Directions } from "@material-ui/icons";
import AssignmentSelectItem from "../../../common-components/AssignmentSelectItem";

const styles = theme => ({
  containerMain: { margin: "0.5rem 0", flexGrow: 1, flexDirection: "row" },
  root: {
    margin: "2rem 0",
    flexGrow: 1
  },

  formControlFirst: {
    margin: theme.spacing.unit,
    marginLeft: 0,
    width: "100%"
  },

  formControlSecond: {
    margin: theme.spacing.unit,
    minWidth: "50%"
  },
  rowTitle: {
    marginTop: "1rem"
  },
  iconButton: {
    width: "4rem",
    height: "4rem",
    marginLeft: "2rem"
  },
  assignment: {
    display: "flex",
    flexWrap: "wrap"
  }
});

class DoubleAssign extends Component {
  state = {
    valueFirst: "",
    valueSecond: [],
    assignments: []
  };

  handleChangeFirst = value => {
    this.setState({ valueFirst: value });
  };

  handleChangeSecond = value => {
    this.setState({ valueSecond: value });
  };

  handleDoubleAssign = () => {
    const { valueFirst, valueSecond, assignments } = this.state;
    if (valueSecond.length) {
      assignments.push({ [valueFirst["value"]]: valueSecond });
      this.setState({
        assignments: assignments,
        valueFirst: "",
        valueSecond: ""
      });
    }
  };

  handleSingleAssign = () => {
    const { valueFirst, assignments } = this.state;
    assignments.push({ [valueFirst["value"]]: "" });
    this.setState({
      assignments: assignments,
      valueFirst: ""
    });
  };

  handleDelete = assignmentKey => {
    let { assignments } = this.state;
    assignments = assignments.filter(
      assignment => Object.keys(assignment)[0] !== assignmentKey
    );
    this.setState({ assignments });
  };

  handleChildDelete = (childKey, parentKey) => {
    let { assignments } = this.state;
    assignments = assignments.map(assignment => {
      const parent = Object.keys(assignment)[0];
      if (parent === parentKey) {
        let filteredChild = assignment[parent].filter(
          child => child.value !== childKey
        );
        assignment[parent] = filteredChild;
      }
      return assignment;
    });
    this.setState({ assignments });
  };

  getOptions = options => {
    const listOptions = [];
    options.map(option => listOptions.push({ value: option, label: option }));
    return listOptions;
  };

  getAssigmentForm = () => {
    const { valueFirst, valueSecond } = this.state;
    const { classes, mode, selectedPersona, accessibleFeatures } = this.props;
    const optionsFirst = this.getOptions(accessibleFeatures["dataFirst"]);

    const optionsSecond = this.getOptions(accessibleFeatures["dataSecond"]);

    switch (mode) {
      case "create":
      case "update":
        return (
          <div className={classes.containerMain}>
            <Grid container spacing={24}>
              <Grid item sm={3}>
                <FormControl className={classes.formControlFirst}>
                  <Select
                    value={valueFirst}
                    onChange={this.handleChangeFirst}
                    styles={customStyles}
                    placeholder={accessibleFeatures["placeholderFirst"]}
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={optionsFirst[0]}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={true}
                    name="selectFirst"
                    options={optionsFirst}
                    theme={theme => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: "EEEEEE",
                        primary: "E0E0E0"
                      }
                    })}
                  />
                </FormControl>
                {selectedPersona === "Regional Admin" && (
                  <IconButton
                    color="inherit"
                    onClick={this.handleSingleAssign}
                    className={classes.iconButton}
                  >
                    <AddCircleTwoTone className={classes.icon} />
                    <Typography style={{ marginLeft: "5px" }}>ADD</Typography>
                  </IconButton>
                )}
              </Grid>

              {selectedPersona !== "Regional Admin" && valueFirst && (
                <Grid item sm={9}>
                  <FormControl className={classes.formControlSecond}>
                    <Select
                      closeMenuOnSelect={false}
                      components={makeAnimated()}
                      isMulti
                      value={valueSecond}
                      onChange={this.handleChangeSecond}
                      styles={customStyles}
                      placeholder={accessibleFeatures["placeholderSecond"]}
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={optionsSecond[0]}
                      isDisabled={false}
                      isLoading={false}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      name="selectSecond"
                      options={optionsSecond}
                      theme={theme => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: "EEEEEE",
                          primary: "E0E0E0"
                        }
                      })}
                    />
                  </FormControl>
                  <IconButton
                    color="inherit"
                    onClick={this.handleDoubleAssign}
                    className={classes.iconButton}
                  >
                    <AddCircleTwoTone className={classes.icon} />
                    <Typography style={{ marginLeft: "5px" }}>ADD</Typography>
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </div>
        );

      default:
        return null;
    }
  };

  getAssigmentTree = () => {
    const { assignments } = this.state;
    const { classes, mode, selectedPersona } = this.props;

    return (
      <Paper style={{ maxHeight: 150, overflow: "auto", boxShadow: "0 0 0 0" }}>
        <div className={classes.assignment}>
          {assignments &&
            assignments.map(assignment => (
              <AssignmentSelectItem
                key={Object.keys(assignment)[0]}
                handleDelete={this.handleDelete}
                handleChildDelete={this.handleChildDelete}
                assignmentData={assignment}
                mode={mode}
                selectedPersona={selectedPersona}
              />
            ))}
        </div>
      </Paper>
    );
  };

  render() {
    const { classes, accessibleFeatures } = this.props;
    const assignmentTree = this.getAssigmentTree();

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item sm={3} className={classes.rowTitle}>
            <Typography variant="subtitle1" gutterBottom>
              {accessibleFeatures["AssignmentMessage"]}
            </Typography>
          </Grid>

          <Grid item sm={9}>
            {this.getAssigmentForm()}
            {assignmentTree}
          </Grid>
        </Grid>
      </div>
    );
  }
}

DoubleAssign.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DoubleAssign);

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "gray" : "",
    padding: 20,
    borderRadius: 2
  }),
  control: (base, state) => ({
    ...base,
    height: "56px",
    borderRadius: "4px",
    "&:hover": { borderColor: "#FDDA24", transition: "opacity 1000ms" },
    border: "1px solid lightgray",
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
