import React from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    display: "flex",
    justifyContents: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    flexGrow: 1,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    maxWidth: "fit-content",
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  icon: {
    fontSize: "1.5rem",
    color: "#ec4324d6",
    marginRight: "1rem",
    cursor: "pointer"
  },
  listContainer: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  company: {
    display: "flex",
    flexDirection: "column"
  },
  headerAssign: {
    fontSize: "1rem",
    fontWeight: "bold"
  },
  itemsAssign: {
    marginBottom: "0.3rem"
  },
  childContainer: {
    display: "flex",
    alignItems: "center"
  },
  crossIcon: {
    fontSize: "0.65rem",
    marginRight: "1.7rem",
    marginLeft: "0.5rem",
    cursor: "pointer",
    color: "rgb(236, 18, 18)"
  }
});

class AssignmentSelectItem extends React.Component {
  state = {
    RnA: {}
  };

  getAssignmentTree = (subAssignments, assignmentRoot) => {
    const { classes, mode } = this.props;
    return subAssignments.map(assignment => {
      return (
        <div key={assignment.label} className={classes.childContainer}>
          {mode !== "view" && (
            <Typography
              onClick={event => {
                this.handleChildDelete(assignment.label, assignmentRoot);
              }}
              className={classes.crossIcon}
            >
              {`X    `}
            </Typography>
          )}
          {this.renderTypographyConditionally(assignment.label)}
        </div>
      );
    });
  };

  handleDeleteIn = assignmentKey => {
    const { handleDelete } = this.props;
    handleDelete(assignmentKey);
  };

  handleChildDelete = (childKey, parentKey) => {
    const { handleChildDelete } = this.props;
    handleChildDelete(childKey, parentKey);
  };

  renderTypographyConditionally = label => {
    const { classes } = this.props;

    return label.length ? <Typography key={label}>{label}</Typography> : null;
  };

  render() {
    const { classes, assignmentData, mode, selectedPersona } = this.props;

    return (
      <Paper
        className={classes.root}
        style={{
          boxShadow: "none",
          backgroundColor: "#c3dce678"
        }}
      >
        <div className={classes.listContainer}>
          <div className={classes.childContainer}>
            {mode !== "view" && (
              <DeleteOutline
                className={classes.icon}
                onClick={event => {
                  this.handleDeleteIn(Object.keys(assignmentData)[0]);
                }}
              />
            )}
            <Typography className={classes.headerAssign}>
              {Object.keys(assignmentData)[0]}
            </Typography>
          </div>
          {selectedPersona !== "Regional Admin" &&
            this.getAssignmentTree(
              assignmentData[Object.keys(assignmentData)[0]],
              Object.keys(assignmentData)[0]
            )}
        </div>
      </Paper>
    );
  }
}

AssignmentSelectItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssignmentSelectItem);
