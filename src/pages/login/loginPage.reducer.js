import { isLogin } from "../../app/Utils";

const initialState = {
  mobile: localStorage.getItem("mobile") || "",
  otpCode: localStorage.getItem("access_token") || "",
  isLogin: isLogin(),
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "getPhoneNumber":
      return {
        ...state,
        mobile: action.payload,
      };
    case "getOtpCode":
      return {
        ...state,
        otpCode: action.payload,
      };
    case "successLogin":
      return {
        ...state,
        isLogin: true,
      };

    default:
      return state;
  }
};
