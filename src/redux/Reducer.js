import { combineReducers } from "redux";
import { loginReducer } from "../pages/login/loginPage.reducer";

const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;
