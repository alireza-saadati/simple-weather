import Container from "../../components/container/Container";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

// 1. create reducer for counter
// 2. add to combine reducer
// 3. get data from store via useSelector

const Counter = () => {
  const dispatch = useDispatch();

  const { number } = useSelector((state) => state.counterReducer);

  // an action to increase counter number =>  type: "increase"
  // dispatch({ type: "increase" });
  const increaseNumber = () => dispatch({ type: "increase" });

  // an action to decrease => type: "decrease"
  // dispatch({ type: "decrease" });
  const decreaseNumber = () => dispatch({ type: "decrease" });

  return (
    <Container className="flex-center">
      <div style={{ textAlign: "center", marginBottom: 20, display: "grid" }}>
        <div>counter:</div>
        <div>{number}</div>
      </div>
      <Button
        onClick={increaseNumber}
        type={"primary"}
        style={{ marginRight: 20 }}
      >
        +
      </Button>
      <Button type={"primary"} onClick={decreaseNumber} disabled={number === 0}>
        -
      </Button>
    </Container>
  );
};

export default Counter;
