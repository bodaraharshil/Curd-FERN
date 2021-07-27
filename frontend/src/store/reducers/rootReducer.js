import { combineReducers } from "redux";

import UserReducers from "./user";

const rootReducer = combineReducers({
  UserReducers,
});

export default rootReducer;
