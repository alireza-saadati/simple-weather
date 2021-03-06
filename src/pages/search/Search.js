import "./search.style.scss";
import Container from "../../components/container/Container";
import { useState } from "react";
import { Button, Col, Input, Layout, message, Row } from "antd";
import Icon, {
  EnvironmentOutlined,
  FireOutlined,
  FrownOutlined,
  GithubOutlined,
  GlobalOutlined,
  ReloadOutlined,
  SearchOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { Config } from "../../app/constant";
import { ApiService } from "../../app/apiService";

const { Content } = Layout;

const Search = () => {
  const [countryName, setCountryName] = useState("");
  const [weatherResult, setWeatherResult] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchByGeoLocation = (lat, lon) => {
    setLoading(true);
    ApiService.get(
      `weather?appid=${Config.openWeatherApiKey}&lat=${lat}&lon=${lon}`
    )
      .then((response) => {
        setWeatherResult(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const fetchCountriesList = () => {
    setLoading(true);
    ApiService.get(`weather?appid=${Config.openWeatherApiKey}&q=${countryName}`)
      .then((response) => {
        setWeatherResult(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          console.log(error.response.data.message);
          return message.error(error.response.data.message);
        }
        message.error("Error in receiving data");
      });
  };

  console.log(weatherResult);

  const getMyLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          fetchByGeoLocation(latitude, longitude);
        },
        () => {
          setLoading(false);
          message.error("Can not find your location");
        }
      );
    }
  };

  const handleReset = () => setWeatherResult({});

  const WindSpeedSvg = () => (
    <svg
      id="Capa_1"
      enableBackground="new 0 0 512 512"
      height="24"
      viewBox="0 0 512 512"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="m134.5 210.88c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5c0-39.305 21.534-75.282 56.198-93.892 3.649-1.959 5.02-6.506 3.061-10.155-1.96-3.649-6.506-5.02-10.156-3.061-39.541 21.228-64.103 62.269-64.103 107.108zm-65.303 43.307c-3.78-15.17-5.697-30.878-5.697-46.687 0-38.891 11.538-76.359 33.368-108.354 21.32-31.249 51.01-55.355 85.858-69.711 3.83-1.578 5.656-5.961 4.078-9.792-1.577-3.829-5.959-5.657-9.791-4.078-37.563 15.475-69.561 41.454-92.535 75.127-23.538 34.496-35.978 74.888-35.978 116.808 0 17.03 2.066 33.958 6.143 50.313 1.01 4.054 5.157 6.444 9.091 5.464 4.019-1.001 6.465-5.071 5.463-9.09zm237.105-137.199c34.664 18.61 56.198 54.587 56.198 93.892 0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5c0-44.839-24.562-85.88-64.103-107.108-3.65-1.959-8.196-.589-10.156 3.061-1.959 3.649-.589 8.195 3.061 10.155zm-100.132 284.407c1.18-3.971-1.083-8.146-5.055-9.325-25.198-7.484-48.25-19.873-68.513-36.823-3.178-2.657-7.907-2.236-10.565.941-2.657 3.177-2.236 7.907.94 10.565 21.843 18.271 46.695 31.626 73.868 39.696 3.869 1.149 8.132-1.039 9.325-5.054zm223.304-104.099-74.377-63.225c-11.019-9.462-25.808-5.017-33.871 5.57l-23.625-13.641c9.532-25.689-6.874-54.461-34.101-59.089v-28.753c2.4-.829 4.729-1.93 6.934-3.331 9.505-6.042 15.179-16.372 15.179-27.634v-86.369c-.001-11.482-9.342-20.824-20.825-20.824-10.059 0-18.673 7.182-20.484 17.077l-17.565 96.024c-1.786 9.764 3.244 19.526 12.231 23.74 3.07 1.439 6.282 2.364 9.53 2.807v27.281c-12.905 2.223-24.062 9.899-30.715 21.184-7.025 11.917-7.822 25.809-3.38 37.878l-24.924 14.395c-1.919-1.666-4.042-3.133-6.36-4.342-9.982-5.21-21.767-4.958-31.521.672l-74.796 43.184c-9.875 5.62-13.301 18.609-7.622 28.446 5.07 8.783 15.714 12.54 25.03 9.201l91.942-32.8c9.35-3.335 15.289-12.572 14.443-22.463-.289-3.375-1.09-6.618-2.329-9.651l23.618-13.641c2.707 3.264 5.92 6.184 9.613 8.627l-6.894 136.133c-.224 4.272 3.21 7.879 7.496 7.879 3.968 0 7.281-3.113 7.484-7.121l6.615-130.628c3.219.726 6.477 1.105 9.722 1.105 3.333 0 6.643-.397 9.875-1.131l12.314 243.144h-44.222l3.913-77.25c.21-4.137-2.974-7.66-7.111-7.87-4.135-.226-7.66 2.975-7.869 7.111l-3.952 78.009h-87.518c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h249.288c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-87.51l-12.63-249.403c3.55-2.345 6.786-5.232 9.593-8.612l24.922 14.39c-2.667 13.566 3.585 27.656 15.763 34.637l74.797 43.185c9.833 5.689 22.642 2.431 28.446-7.623 5.029-8.711 3.117-19.762-4.547-26.278zm-248.36-26.676-91.942 32.8c-2.651.948-5.593-.137-7-2.574-1.584-2.743-.62-6.385 2.132-7.956l74.797-43.184c5.371-3.101 11.597-3.226 17.081-.364 5.491 2.866 8.943 8.048 9.471 14.22.265 3.106-1.601 6.01-4.539 7.058zm64.223-147.361c-2.824-1.324-4.404-4.391-3.843-7.458l17.565-96.024c.506-2.768 2.915-4.776 5.729-4.776 3.212 0 5.824 2.613 5.824 5.824v86.368c0 6.194-2.998 11.652-8.226 14.975-5.225 3.322-11.44 3.722-17.049 1.091zm35.95 102.29c-8.22 13.945-26.252 18.603-40.2 10.381-13.944-8.221-18.601-26.254-10.38-40.2 5.328-9.038 14.864-14.451 25.293-14.451.046 0 .09-.006.135-.007 21.654-.377 36.596 24.863 25.152 44.277zm139.743 90.525c-1.606 2.782-5.173 3.737-7.956 2.132l-74.797-43.185c-11.203-6.341-11.78-22.73-1.276-29.922 2.57-1.76 6.004-1.62 8.381.401l74.376 63.224c2.143 1.823 2.679 4.914 1.272 7.35zm-165.033-112.934c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5-3.358-7.5-7.5-7.5zm123.402 152.106c-20.279 16.956-43.331 29.345-68.515 36.824-3.972 1.179-6.234 5.354-5.055 9.325 1.192 4.011 5.441 6.208 9.324 5.054 27.156-8.065 52.009-21.42 73.866-39.695 3.178-2.657 3.601-7.387.943-10.564-2.654-3.179-7.385-3.6-10.563-.944zm48.123-264.554c-22.975-33.673-54.973-59.652-92.536-75.126-3.828-1.579-8.214.248-9.791 4.078-1.578 3.83.248 8.214 4.078 9.792 34.849 14.356 64.538 38.462 85.858 69.711 21.83 31.995 33.368 69.463 33.368 108.354 0 15.809-1.917 31.516-5.697 46.687-1.002 4.019 1.444 8.089 5.464 9.091 3.916.976 8.078-1.401 9.091-5.464 4.076-16.355 6.143-33.283 6.143-50.313 0-41.922-12.44-82.314-35.978-116.81z" />
      </g>
    </svg>
  );

  const WindSpeedIcon = (props) => <Icon component={WindSpeedSvg} {...props} />;

  return (
    <Container style={{ background: "#e85063" }} loading={loading}>
      <div className="search-box">
        <Input
          className="global-input"
          placeholder="Enter the city"
          onChange={(event) => setCountryName(event.target.value)}
        />

        <div className="global-button">
          <Button
            className="button first-button"
            onClick={fetchCountriesList}
            style={{ margin: "0 auto", marginTop: "2rem" }}
            type="primary"
            icon={<SearchOutlined />}
            loading={loading}
          >
            Search
          </Button>
          <Button
            className="button"
            onClick={getMyLocation}
            style={{ margin: "0 auto", marginTop: "2rem" }}
            icon={<EnvironmentOutlined />}
          >
            Find MyLocation
          </Button>
          <Button
            className="button"
            onClick={handleReset}
            style={{ margin: "0 auto", marginTop: "2rem" }}
            icon={<ReloadOutlined />}
            disabled={!countryName.length}
          >
            Reset
          </Button>
        </div>

        <Content className="global-output">
          <Row className="first-row">
            <Col span={8} className="flex-center">
              <div className="global-output--title">
                <GlobalOutlined />
                :&nbsp;
              </div>
              <div className="global-output--text">
                {(weatherResult &&
                  weatherResult.sys &&
                  weatherResult.sys.country) ||
                  " -"}
              </div>
            </Col>
            <Col span={8} className="flex-center">
              <div className="global-output--title">
                <FireOutlined />
                :&nbsp;
              </div>
              <div className="global-output--text">
                {(weatherResult &&
                  weatherResult.main &&
                  weatherResult.main.temp) ||
                  " -"}
              </div>
            </Col>

            <Col span={8} className="flex-center">
              <div className="global-output--title">
                <GithubOutlined />
                :&nbsp;
              </div>
              <div className="global-output--text">
                {(weatherResult &&
                  weatherResult.main &&
                  weatherResult.main.sea_level) ||
                  " -"}
              </div>
            </Col>
          </Row>
          <Row className="second-row">
            <Col span={8} className="flex-center">
              <div className="global-output--title">
                <FrownOutlined />
                :&nbsp;
              </div>
              <div className="global-output--text">
                {(weatherResult &&
                  weatherResult.main &&
                  weatherResult.main.pressure) ||
                  " -"}
              </div>
            </Col>
            <Col span={8} className="flex-center">
              <div className="global-output--title">
                <WindSpeedIcon style={{ fontSize: "12px" }} />
                :&nbsp;
              </div>
              <div className="global-output--text">
                {(weatherResult &&
                  weatherResult.wind &&
                  weatherResult.wind.speed) ||
                  " -"}
              </div>
            </Col>
            <Col span={8} className="flex-center">
              <div className="global-output--title">
                <ThunderboltOutlined />
                :&nbsp;
              </div>
              <div className="global-output--text">
                {(weatherResult &&
                  weatherResult.main &&
                  weatherResult.main.humidity) ||
                  " -"}
              </div>
            </Col>
          </Row>
        </Content>
      </div>
    </Container>
  );
};

export default Search;
