import { apis } from "../services";
import { TEST_SUCCES } from "../constants";

export const getTestData = data => {
  return dispatch => {
    apis.testApi(data, dispatch, (err, response) => {
      if (err) {
        console.log(err);
      }
      if (response) {
        dispatch({
          type: TEST_SUCCES,
          payload: response
        });
      }
    });
  };
};
