import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import _ from "lodash";

import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";

import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  COUNTRY,
  MOBILE,
  JOB_TITLE,
  ORGANIZATION_STATIC,
  ORGANIZATION_SELECT,
  PREFERRED_LANGUAGE
} from "../../../constants/features";
import SelectLanguage from "./SelectLanguage";
import SingleSelect from "./SingleSelect";
import { CountryList } from "../../../data/Countries";
import { OrganizationList } from "./../../../data/Organiztions";
import MultiSelect from "./MultiSelect";
import { List } from "@material-ui/icons";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "2rem 0 1rem 0"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
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
    marginLeft: 0,
    minWidth: "100%"
  },
  dimColor: {
    marginLeft: 10,
    color: "#9e9e9e"
  },
  dimHead: {
    color: "#9e9e9e"
  }
});

class PersonalInformation extends React.Component {
  state = {
    labelWidth: 0,
    selectedCountry: ""
  };

  handleCountryChange = country => {
    const { onInputChange } = this.props;
    onInputChange("country", country);
  };

  handleJobTitleChange = title => {
    const { onInputChange } = this.props;
    onInputChange("jobTitle", title);
  };

  handleInputChange = field => event => {
    const { onInputChange } = this.props;
    onInputChange(field, event.target.value);
  };

  getModeBasedRow = field => {
    const { mode, personalInformation, classes } = this.props;

    switch (mode) {
      case "view":
        return (
          <div>
            <Typography variant="subtitle2" gutterBottom>
              {field}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {personalInformation[_.camelCase(field)]}
            </Typography>
          </div>
        );

      case "create":
      case "update":
        return (
          <div>
            <Typography
              variant="subtitle2"
              gutterBottom
              className={classes.dimColor}
            >
              {field}
            </Typography>
            <TextField
              required
              id="outlined-required"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              onChange={this.handleInputChange(field)}
            />
          </div>
        );
      default:
        break;
    }
  };

  render() {
    const {
      classes,
      accessibleFeatures,
      selectedPersona,
      mode,
      personalInformation
    } = this.props;
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
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={3} className={classes.rowTitle}>
            <Typography variant="subtitle1" gutterBottom>
              PERSONAL INFORMATION
            </Typography>
          </Grid>

          <Grid item xs={9}>
            <form className={classes.container} autoComplete="off">
              <Grid container spacing={24}>
                {accessibleFeatures[selectedPersona].indexOf(FIRST_NAME) >
                  -1 && (
                  <Grid item xs={3}>
                    {this.getModeBasedRow("FIRST NAME")}
                  </Grid>
                )}

                {accessibleFeatures[selectedPersona].indexOf(LAST_NAME) >
                  -1 && (
                  <Grid item xs={3}>
                    {this.getModeBasedRow("LAST NAME")}
                  </Grid>
                )}

                {accessibleFeatures[selectedPersona].indexOf(EMAIL) > -1 && (
                  <Grid item xs={5}>
                    {this.getModeBasedRow("EMAIL")}
                  </Grid>
                )}

                {accessibleFeatures[selectedPersona].indexOf(COUNTRY) > -1 &&
                  (mode === "create" || mode === "update" ? (
                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle2"
                        className={classes.dimColor}
                        gutterBottom
                      >
                        COUNTRY
                      </Typography>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <SingleSelect
                          placeholder="Select Country"
                          options={CountryList}
                          onChange={this.handleCountryChange}
                        />
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={3}>
                      <div>
                        <Typography variant="subtitle2" gutterBottom>
                          COUNTRY
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          {personalInformation.country}
                        </Typography>
                      </div>
                    </Grid>
                  ))}

                {accessibleFeatures[selectedPersona].indexOf("Job Title") >
                  -1 &&
                  (mode === "create" || mode === "update" ? (
                    <Grid item xs={3}>
                      <Typography
                        variant="subtitle2"
                        className={classes.dimColor}
                        gutterBottom
                      >
                        JOB TITLE
                      </Typography>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <SingleSelect
                          placeholder="Select Job Title"
                          options={titleList}
                          onChange={this.handleJobTitleChange}
                        />
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={3}>
                      <div>
                        <Typography variant="subtitle2" gutterBottom>
                          JOB TITLE
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          Ranch Assistant
                        </Typography>
                      </div>
                    </Grid>
                  ))}

                {accessibleFeatures[selectedPersona].indexOf(
                  PREFERRED_LANGUAGE
                ) > -1 &&
                  (mode === "create" ? (
                    <Grid item xs={4}>
                      <div className={classes.defaultText}>
                        <Typography
                          variant="subtitle2"
                          className={classes.dimColor}
                        >
                          PREFERRED LANGUAGE
                        </Typography>
                        <SelectLanguage />
                      </div>
                    </Grid>
                  ) : (
                    <Grid item xs={4}>
                      <div>
                        <Typography variant="subtitle2" gutterBottom>
                          PREFERRED LANGUAGE
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                          English
                        </Typography>
                      </div>
                    </Grid>
                  ))}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

PersonalInformation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PersonalInformation);
