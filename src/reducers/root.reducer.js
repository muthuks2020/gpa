import { combineReducers } from "redux";
import simpleReducer from "./simple.reducer";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  test: simpleReducer,
  auth: authReducer,
  user: userReducer
});
