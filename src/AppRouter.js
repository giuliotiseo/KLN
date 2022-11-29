import { Route, Routes } from "react-router-dom";
import AppLayout from "./globals/AppLayout";
import AuthLayout from "./auth-user/layout/AuthLayout";
import LoginContainer from "./auth-user/containers/LoginContainer";
import SubscribeRouter from "./subscribe/router/SubscribeRouter";
import ErrorPage from "./globals/components/layout/ErrorPage";
import RequireAuth from "./globals/components/navigation/RequireAuth";
// Only on prod--dev branch: 
import AuthcodeContainer from "./auth-user/containers/AuthcodeContainer";
import ForgotPasswordContainer from "./auth-user/containers/ForgotPasswordContainer";
import RestorePasswordContainer from "./auth-user/containers/RestorePasswordContainer";
import SignUpContainer from "./auth-user/containers/SignupContainer";
import PrivateAppContainer from "./private-app/containers/PrivateAppContainer";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path='login' element={<LoginContainer />} />
          <Route path='signup' element={<SignUpContainer />} />
          <Route path='authcode' element={<AuthcodeContainer />} />
          <Route path='forgot-password' element={<ForgotPasswordContainer />} />
          <Route path='restore-password' element={<RestorePasswordContainer />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<PrivateAppContainer />} />
        </Route>

        {/* Subscribe extra routes */}
        <Route path='subscribe/*' element={<SubscribeRouter />} />
        
        {/* Catch all routes */}
        <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
    </Routes>
  )
}