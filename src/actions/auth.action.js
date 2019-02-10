import history from "../utils/history";
import { USER_LOGOUT_REQUEST, USER_AUTH_SUCCESS } from "../constants";
import userMap from "../data/userMap";
import SuperAdmin from "../data/SuperAdmin";
import RegionalAdmin from "../data/RegionalAdmin";
import RanchAdmin from "../data/RanchAdmin";
import HarvestPlanner from "../data/HarvestPlanner";

export const logout = () => {
  return dispatch => {
    dispatch({
      type: USER_LOGOUT_REQUEST
    });
    localStorage.clear();
    history.push("/");
  };
};

export const login = data => {
  return dispatch => {
    dispatch({
      type: USER_AUTH_SUCCESS,
      user: data
    });

    const persona = userMap[data];
    let personaData;
    switch (persona) {
      case "Super Admin":
        personaData = SuperAdmin;
        break;
      case "Regional Admin":
        personaData = RegionalAdmin;
        break;
      case "Harvest Planner":
        personaData = HarvestPlanner;
        break;
      case "Ranch Admin":
        personaData = RanchAdmin;
        break;
      default:
        personaData = SuperAdmin;
        break;
    }

    localStorage.setItem(
      "fName",
      personaData.personaData.personalInformation.firstName
    );
    localStorage.setItem(
      "lName",
      personaData.personaData.personalInformation.lastName
    );
    localStorage.setItem("user", data);
    localStorage.setItem("persona", userMap[data]);

    switch (userMap[data]) {
      case "Super Admin":
        history.push("/home");
        break;
      case "Regional Admin":
        history.push({
          pathname: "/register",
          state: {
            mode: "register",
            personalInformation: personaData.personaData.personalInformation
          }
        });
        break;
      case "Harvest Planner":
        history.push({
          pathname: "/register",
          state: {
            mode: "register",
            personalInformation: personaData.personaData.personalInformation
          }
        });
        break;
      case "Ranch Admin":
        history.push({
          pathname: "/register",
          state: {
            mode: "register",
            personalInformation: personaData.personaData.personalInformation
          }
        });
        break;

      default:
        history.push("/home");
        break;
    }
  };
};
