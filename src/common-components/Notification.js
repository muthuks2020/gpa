import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Notification extends React.Component {
  onClose = (event, reason) => {
    const { hideNotification } = this.props;
    if (reason === "clickaway") {
      return;
    }
    hideNotification(false);
  };

  render() {
    const { classes, open } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={open}
        autoHideDuration={3000}
        onClose={this.onClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">User created successfully.</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.onClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notification);
