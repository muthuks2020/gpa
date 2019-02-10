import {
  CREATE_OKTA_USER_SUCCESS,
  SEND_ACTIVATION_MAIL_SUCCESS
} from "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_OKTA_USER_SUCCESS:
      return {
        ...state,
        invitedUser: action.payload
      };

    case SEND_ACTIVATION_MAIL_SUCCESS:
      return {
        ...state,
        activationMailSent: true
      };

    default:
      return state;
  }
};
