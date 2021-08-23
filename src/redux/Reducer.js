import { combineReducers } from "redux";
import { loginReducer } from "../pages/login/loginPage.reducer";
import { counterReducer } from "../pages/counter/counter.reducer";

const rootReducer = combineReducers({
  loginReducer,
  counterReducer,
});

export default rootReducer;
