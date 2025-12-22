import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
import { API_ENDPOINT } from "./constants";

export const authClient = createAuthClient({
  baseURL: API_ENDPOINT,
  plugins: [emailOTPClient()],
});

export const {
  signIn,
  signUp,
  useSession,
  signOut,
  sendVerificationEmail,
  changePassword,
  changeEmail,
  updateUser,
  requestPasswordReset,
  verifyEmail,
  forgetPassword,
} = authClient;
