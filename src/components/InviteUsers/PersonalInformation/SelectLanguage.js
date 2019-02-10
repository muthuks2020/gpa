import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel
} from "@material-ui/core";

const styles = theme => ({
  checked: {
    flexFlow: 1
  },
  formControl: {
    margin: `${theme.spacing.unit}`,
    marginTop: 0,
    paddingTop: "0.6rem"
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  root: {
    color: "#6F5091",
    "&$checked": {
      color: "#6F5091"
    }
  },
  checked: {}
});

class SelectLanguage extends React.Component {
  state = {
    value: "english"
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  getLanguageRadioButtons = () => {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          className={classes.group}
          value={value}
          onChange={this.handleChange}
          classes={{
            root: classes.root,
            checked: classes.checked
          }}
        >
          <FormControlLabel
            value="english"
            control={<Radio />}
            label="English"
            style={{ marginRight: "40px" }}
          />
          <FormControlLabel
            value="spanish"
            control={<Radio />}
            label="Spanish"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.checked}>{this.getLanguageRadioButtons()}</div>
    );
  }
}

SelectLanguage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectLanguage);
