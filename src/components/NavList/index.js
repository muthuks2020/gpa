import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Divider } from "@material-ui/core";

import ManageUsers from "../../containers/ManageUsers";
import InviteUsers from "../../containers/InviteUsers";
import {
  INVITE_USERS,
  MANAGE_USERS,
  FAQ,
  REMINDER_TIME,
  REPORTS,
  REGINONAL_ADMIN
} from "../../constants/features";

//Required feature objects
import SuperAdmin from "../../data/SuperAdmin";
import RegionalAdmin from "../../data/RegionalAdmin";
import RanchAdmin from "../../data/RanchAdmin";
import HarvestPlanner from "../../data/HarvestPlanner";
import NavBar from "../../containers/NavBar";
import userMap from "../../data/userMap";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: "6rem"
  },
  navItem: {
    fontSize: "1rem"
  },
  divider: { marginRight: "4rem", marginLeft: "4rem" }
});

class NavList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      navItems: [
        "INVITE USERS",
        "MANAGE USERS",
        "FAQs",
        "REMINDER TIME",
        "REPORTS"
      ]
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderNavItems = () => {
    const { navItems } = this.state;
    const { classes } = this.props;
    return navItems.map((item, index) => (
      <Tab className={classes.navItem} key={index} label={item} />
    ));
  };

  getPersonaData = () => {
    const user = localStorage.getItem("user");
    const persona = userMap[user];
    switch (persona) {
      case "Super Admin":
        return SuperAdmin;
      case "Regional Admin":
        return RegionalAdmin;
      case "Harvest Planner":
        return HarvestPlanner;
      case "Ranch Admin":
        return RanchAdmin;

      default:
        return SuperAdmin;
    }
  };

  render() {
    const { personaData } = this.getPersonaData();
    const mode = "create";
    const { classes, handleLogout } = this.props;
    const { value } = this.state;

    return (
      <div>
        <NavBar
          handleLogout={handleLogout}
          persona={personaData.persona_type}
        />
        <Tabs
          className={classes.root}
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="secondary"
          centered
        >
          {this.renderNavItems()}
        </Tabs>
        <Divider className={classes.divider} />
        {value === 0 && personaData.accessibleFeatures[INVITE_USERS] && (
          <InviteUsers
            persona={personaData.persona_type}
            accessibleFeatures={personaData.accessibleFeatures[INVITE_USERS]}
            mode={mode}
          />
        )}
        {value === 1 && personaData.accessibleFeatures[MANAGE_USERS] && (
          <ManageUsers
            persona={personaData.persona_type}
            accessibleFeatures={personaData.accessibleFeatures[MANAGE_USERS]}
          />
        )}
      </div>
    );
  }
}

NavList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavList);
