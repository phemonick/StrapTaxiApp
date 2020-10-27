import { Actions } from "react-native-router-flux";
import { socailSignupSuccess } from "./entrypage";
import { registerAsyncFb } from "./register";
import { signinAsyncFb } from "./signin";
import config from "../../../config.js";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";

export function userLoginRequest() {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_REQUEST });
  };
}
export function checkUser(obj, signInData) {
  const userCredentialsFb = obj;
  return (dispatch, getState) => {
    fetch(`${config.serverSideUrl}:${config.port}/api/auth/checkUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentialsFb)
    })
      .then(resp => {
        resp.json().then(data => {
          if (obj.request === "Register") {
            if (data.message === "User Exist") {
              dispatch(registerAsyncFb(data));
            } else {
              dispatch(socailSignupSuccess(signInData));
            }
          } else if (obj.request === "Login") {
            if (data.message === "User Exist") {
              const userInfo = {
                email: data.data.user.email,
                password: signInData.id,
                userType: data.data.user.userType,
                profileUrl: signInData.profileUrl
              };
              dispatch(signinAsyncFb(userInfo));
            } else {
              dispatch(socailSignupSuccess(signInData));
            }
          }
        });
      })
      .catch(e => {
        console.log(e, "error");
      });
  };
}
