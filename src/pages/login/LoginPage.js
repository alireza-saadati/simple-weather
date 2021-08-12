import "./loginPage.style.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Container from "../../components/container/Container";
import Error from "../../components/error/Error";

const LoginPage = () => {
  const [mobile, setMobile] = useState("");
  const [showError, setShowError] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handleMobileChange = (event) => setMobile(event.target.value);

  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    if (mobile.length === 11 && showOtpInput && otpCode) {
      // 1. set mobile in local storage
      localStorage.setItem("mobile", mobile);
      // 1. set otpCode in local storage
      localStorage.setItem("access_token", otpCode);
      history.push("/");
    } else if (mobile.length === 11) {
      console.log("2. showOtpInput");
      setShowOtpInput(true);
    } else {
      setShowError(true);
    }
  };

  return (
    <Container className={"center"} style={{ background: "#3c4673" }}>
      <div className="login">
        <div className="header">Hello Everyone</div>
        <form className="login--mobile-input">
          <input
            maxLength={11}
            className="global-input"
            placeholder="شماره موبایل خود را وارد کنید"
            onChange={handleMobileChange}
            value={mobile}
          />

          {showOtpInput && (
            <input
              className="global-input"
              placeholder="کد ارسال شده را وارد کنید"
              onChange={(event) => setOtpCode(event.target.value)}
            />
          )}

          <button className="absolute-center button" onClick={onSubmit}>
            Send
          </button>
        </form>
        {showError && <Error text="!شماره موبایل صحیح نیست" />}
      </div>
    </Container>
  );
};

export default LoginPage;
