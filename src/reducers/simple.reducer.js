import { TEST_SUCCES } from "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case TEST_SUCCES:
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
