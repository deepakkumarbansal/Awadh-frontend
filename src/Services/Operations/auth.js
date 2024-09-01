import { setLoading } from "../../store/slice/authSlice";
// import {setUser} from "../../store/slice/authSlice"
// import { endpoints } from "../apis";

import { apiConnector } from "../connector";
import { toast } from "react-hot-toast";

// const {
// LOGIN_API
  
// } = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      console.log("printing emailin otp ", email);
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        // checkUserPresent: true,
      });
      console.log("SENDOTP API RESPONSE...1.........", response.data.message);

      if (!response.data.success) {
        toast.error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log(
        "SENDOTP API ERROR....2........",
        error.response.data.message
      );
      //   toast.error(response.message);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
//   otp,
//   accountType,
  navigate
) {
  return async (dispatch) => {
    // console.log("into signup fn", firstName);
    dispatch(setLoading(true));
    try {
      console.log(
        "into signup fn",
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        accountType
      );

      const signUpRes = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        accountType,
      });
      //   console.log("into signup fn", email);
      if (!signUpRes.data.success) {
        throw new Error(signUpRes.data.message);
      }

      console.log("signUp k bad responce", signUpRes.data);
      toast.success("Sign up Is Successfully, please login");
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error("SignUp Failed");

      navigate("/signUp");
    }
    dispatch(setLoading(false));
  };
}
export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const loginRes = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      toast.success("loggedIn successfully");
      console.log("printing token 108", loginRes.data.token);
      dispatch(setToken(loginRes.data.token));

      const userImage = loginRes.data?.user?.image
        ? loginRes.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${loginRes.data.user.firstName} ${loginRes.data.user.lastName}`;
      // console.log("afterlogin user",loginRes.data.user)
      dispatch(setUser({ ...loginRes.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(loginRes.data.token));
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));

      console.log("login responce", loginRes);
    //   navigate("/dashboard/my-profile");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("LOGIN API ERROR......1......", error.response);
    }
    dispatch(setLoading(false));
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    //   dispatch(resetCart())
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("accountType");
    toast.success("Logged Out");
    navigate("/");
  };
}
// export function getPasswordResetToken(email, setEmailSent) {
//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await apiConnector("POST", RESETPASSTOKEN_API, {
//         email,
//       });

//       console.log("RESET PASSWORD TOKEN RESPONSE....", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Reset Email Sent");
//       setEmailSent(true);
//     } catch (error) {
//       console.log("RESET PASSWORD TOKEN Error", error);
//       toast.error(error.message ? "Invalid E-mail" : error.message);
//     }
//     dispatch(setLoading(false));
//   };
// }

// export function resetPassword(password, confirmPassword, token, navigate) {
//   return async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//       const response = await apiConnector("POST", RESETPASSWORD_API, {
//         password,
//         confirmPassword,
//         token,
//       });

//       console.log("RESET Password RESPONSE ... ", response);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       toast.success("Password has been reset successfully");
//       navigate("/password-reset-success");
//     } catch (error) {
//       console.log("RESET PASSWORD TOKEN Error", error);
//       toast.error("Unable to reset password");
//     }
//     dispatch(setLoading(false));
//   };
// }
// export function logout(navigate) {
//   return (dispatch) => {
//     dispatch(setToken(null));
//     dispatch(setUser(null));
//     //   dispatch(resetCart())
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("accountType");
//     toast.success("Logged Out");
//     navigate("/");
//   };
// }
