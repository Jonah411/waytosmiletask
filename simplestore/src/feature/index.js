import { combineReducers } from "redux";
import interviewadmin from "../feature/loginReducer/loginReducer";

const rootReducer = combineReducers({
  interviewadmin: interviewadmin,
});

export default rootReducer;
