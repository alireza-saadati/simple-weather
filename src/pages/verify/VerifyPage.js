import "./verifyPage.style.scss";
import Container from "../../components/container/Container";
import { useState } from "react";

const VerifyPage = (props) => {
  const [otpCode, setOtpCode] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    // 1. set mobile in local storage
    localStorage.setItem("mobile", props.location.state);
    // 1. set otpCode in local storage
    localStorage.setItem("access_token", otpCode);
    localStorage.getItem("access_token");
  };

  return (
    <Container className={"center"} style={{ background: "#768acd" }}>
      <div className="verify">
        <div className="header" />
        <div className="verify--mobile-input">
          <input
            className="global-input-style"
            defaultValue={props.location.state}
          />
          <input
            className="global-input-style"
            placeholder="کد ارسال شده را وارد کنید"
            onChange={(event) => setOtpCode(event.target.value)}
          />
        </div>

        <button className="absolute-center button" onClick={onSubmit}>
          Send
        </button>
      </div>
    </Container>
  );
};

export default VerifyPage;
