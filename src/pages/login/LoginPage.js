import "./loginPage.style.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Container from "../../components/container/Container";
import Error from "../../components/error/Error";

const LoginPage = () => {
  const [mobile, setMobile] = useState("");
  const [showError, setShowError] = useState(false);

  const handleMobileChange = (event) => setMobile(event.target.value);

  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    if (mobile.length === 11) {
      // eslint-disable-next-line no-restricted-globals
      return history.push({
        pathname: "/verify",
        state: mobile,
      });
    } else {
      setShowError(true);
    }
  };

  return (
    <Container className={"center"} style={{ background: "#3c4673" }}>
      <div className="login">
        <div className="header"> Hello Everyone</div>
        <form className="login--mobile-input">
          <input
            maxLength={11}
            className="login--mobile-input__input"
            placeholder="شماره موبایل خود را وارد کنید"
            onChange={handleMobileChange}
            value={mobile}
          />
          <button className="absolute-center button" onClick={onSubmit}>
            Send
          </button>
        </form>
        {showError && <Error />}
      </div>
    </Container>
  );
};

export default LoginPage;
