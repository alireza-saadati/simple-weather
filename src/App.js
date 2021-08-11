import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/login/LoginPage";
import VerifyPage from "./pages/verify/VerifyPage";
import WeatherPage from "./pages/weather/WeatherPage";

function App() {
  return (
    <Router>
      <Route component={LoginPage} path={"/login"} />
      <Route component={VerifyPage} path={"/verify"} />
      <Route component={WeatherPage} path={"/"} exact />
      {/* add not found (404) component */}
      {/*<Route component={WeatherPage} />*/}
    </Router>
  );
}

export default App;
