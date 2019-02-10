import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import _ from "lodash";

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

import AssignmentSelectItem from "../../../common-components/AssignmentSelectItem";

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
  assignment: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
});

class Assignment extends React.Component {
  state = {
    personType: "",
    labelWidth: 0,
    assignedDistricts: []
  };

  componentDidMount() {
    const { mode, assignedDistricts } = this.props;
    this.setState({ assignedDistricts });
    if (mode != "view") {
      this.setState({
        labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
      });
    }
  }

  handleChange = event => {
    let { assignedDistricts } = this.state;
    if (!_.find(assignedDistricts, { districtName: event.target.value })) {
      assignedDistricts.push({
        districtName: event.target.value,
        companies: []
      });
    }
    this.setState({ personType: event.target.value, assignedDistricts });
  };

  handleDelete = district => {
    let { assignedDistricts } = this.state;
    assignedDistricts = assignedDistricts.filter(
      dist => dist.districtName !== district
    );
    this.setState({ assignedDistricts });
  };

  getDistrictList = () => {
    const { districts } = this.props;
    return districts.map(district => (
      <MenuItem key={district} value={district}>
        {district}
      </MenuItem>
    ));
  };

  getAssigmentForm = () => {
    const { personType, labelWidth } = this.state;
    const { classes, mode } = this.props;
    const distrctList = this.getDistrictList();
    switch (mode) {
      case "create":
      case "update":
        return (
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              ref={ref => {
                this.InputLabelRef = ref;
              }}
              htmlFor="select-district"
            >
              Select Districts
            </InputLabel>

            <Select
              value={personType}
              onChange={this.handleChange}
              input={
                <OutlinedInput labelWidth={labelWidth} id="select-assignment" />
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {distrctList}
            </Select>
          </FormControl>
        );

      default:
        return null;
    }
  };

  getAssigmentTree = () => {
    const { assignedDistricts } = this.state;
    const { classes, mode } = this.props;

    return (
      <div>
        <div className={classes.assignment}>
          {assignedDistricts &&
            assignedDistricts.map(districtData => (
              <AssignmentSelectItem
                key={districtData.districtName}
                handleDelete={this.handleDelete}
                districtData={districtData}
                mode={mode}
              />
            ))}
        </div>
      </div>
    );
  };

  render() {
    const { classes, subHeading } = this.props;
    const assignmentTree = this.getAssigmentTree();

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item sm={3} className={classes.rowTitle}>
            <Typography variant="subtitle1" gutterBottom>
              {subHeading}
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

Assignment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Assignment);
