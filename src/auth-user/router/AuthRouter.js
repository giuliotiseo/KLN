import { Routes, Route } from "react-router";
import LoginContainer from "../containers/LoginContainer";
// import AuthcodeContainer from "../containers/AuthcodeContainer";
// import SignupContainer from "../containers/SignupContainer";
// import ForgotPasswordContainer from "../containers/ForgotPasswordContainer";
// import RestorePasswordContainer from "../containers/RestorePasswordContainer";

export default function AuthRouter() {
  return (
    <Routes>
      <Route path='login' element={<LoginContainer />} />
      {/* <Route path='signup' element={<SignupContainer />} />
      <Route path='authcode' element={<AuthcodeContainer />} />
      <Route path='forgot-password' element={<ForgotPasswordContainer />} />
      <Route path='restore-password' element={<RestorePasswordContainer />} /> */}
    </Routes>
  )
}