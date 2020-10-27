// import * as Expo from "expo";

export async function requestFbLogin(
  socailSignupSuccess,
  authData,
  checkUser,
  userLoginRequest
) {
  try {
    // const {
    //   type,
    //   token
    // } = await Expo.Facebook.logInWithReadPermissionsAsync(
    //   authData.authToken,
    //   {
    //     permissions: ["public_profile", "email"]
    //   }
    // );
    // if (type === "success") {
    //   userLoginRequest();
    //   const response = await fetch(
    //     `https://graph.facebook.com/me?fields= name,first_name,last_name,email,picture&access_token=${token}`
    //   );
    //   const obj = await response.json();
    //   const credentials = {
    //     email: obj.email,
    //     password: obj.id,
    //     request: "Login"
    //   };
    //   checkUser(credentials, obj);
    // } else {
    //   return "error";
    // }
  } catch (e) {
    console.log(e, "error");
  }
}
export async function requestFbSignUp(
  socailSignupSuccess,
  authData,
  checkUser,
  userLoginRequest
) {
  try {
    // const {
    //   type,
    //   token
    // } = await Expo.Facebook.logInWithReadPermissionsAsync(
    //   authData.authToken,
    //   {
    //     permissions: ["public_profile", "email"]
    //   }
    // );
    // if (type === "success") {
    //   userLoginRequest();
    //   const response = await fetch(
    //     `https://graph.facebook.com/me?fields= name,first_name,last_name,email&access_token=${token}`
    //   );
    //   const obj = await response.json();
    //   const credentials = {
    //     email: obj.email,
    //     password: obj.id,
    //     request: "Register"
    //   };
    //   checkUser(credentials, obj);
    // } else {
    //   return "error";
    // }
  } catch (e) {
    console.log(e, "error");
  }
}
