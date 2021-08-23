import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Search from "./pages/search/Search";
import WeatherPage from "./pages/weather/WeatherPage";
import "antd/dist/antd.css";
import "./App.scss";
import PublicRoute from "./components/privatePublicRout/PublicRoute";
import PrivateRoute from "./components/privatePublicRout/PrivateRoute";
import Counter from "./pages/counter/Counter";

function App() {
  return (
    <Router>
      <PublicRoute component={LoginPage} path={"/login"} restricted />
      <PrivateRoute component={Search} path={"/search"} />
      <PrivateRoute component={WeatherPage} path={"/"} exact />
      <PrivateRoute component={Counter} path={"/counter"} exact />

      {/* add not found (404) component */}
      {/*<Route component={WeatherPage} />*/}
    </Router>
  );
}

export default App;
