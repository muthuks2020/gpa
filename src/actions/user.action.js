import { apis } from "../services";
import {
  CREATE_OKTA_USER_SUCCESS,
  SEND_ACTIVATION_MAIL_SUCCESS
} from "../constants";

export const createOktaUser = data => {
  return dispatch => {
    apis.createOktaUser(data, dispatch, (err, response) => {
      if (err) {
        console.log(err);
      }
      if (response && !response.errorCode) {
        dispatch({
          type: CREATE_OKTA_USER_SUCCESS,
          payload: response
        });
      }
    });
  };
};

export const sendActivationMail = data => {
  return dispatch => {
    apis.sendActivationMail(data, dispatch, (err, response) => {
      if (err) {
        console.log(err);
      }
      if (response) {
        dispatch({
          type: SEND_ACTIVATION_MAIL_SUCCESS
        });
      }
    });
  };
};
