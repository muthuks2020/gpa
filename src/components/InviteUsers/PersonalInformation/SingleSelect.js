import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Select from "react-select";

const styles = theme => ({
  container: {
    maxwidth: "50%"
  }
});

class SingleSelect extends Component {
  state = { value: "" };

  handleChange = value => {
    const { onChange } = this.props;
    this.setState({ value });
    onChange(value);
  };

  getOptions = () => {
    const { options } = this.props;
    const listOptions = [];
    options.map(option => listOptions.push({ value: option, label: option }));
    return listOptions;
  };
  render() {
    const options = this.getOptions();
    const { classes, placeholder } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.container}>
        <Select
          value={value}
          onChange={this.handleChange}
          styles={customStyles}
          placeholder={placeholder}
          className="basic-single"
          classNamePrefix="select"
          defaultValue={options[0]}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name="color"
          options={options}
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
      </div>
    );
  }
}

SingleSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleSelect);

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
    "&:hover": { borderColor: "#FDDA24", transition: "opacity 5000ms" },
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
