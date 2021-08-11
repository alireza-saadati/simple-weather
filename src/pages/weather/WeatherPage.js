import "./weather.style.scss";
import Container from "../../components/container/Container";

const WeatherPage = () => {
  return (
    <Container style={{ background: "#f1d584" }}>
      <div className="date">Wednesday,27th august</div>
      <div className="time">3:13pm</div>
      <div className="location">Tehran</div>
      <div className="temperature">19 celsius</div>
      <div className="today">Wednesday</div>
    </Container>
  );
};

export default WeatherPage;
