import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
import { API_ENDPOINT } from "./constants";
import { admin } from "better-auth/plugins";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: API_ENDPOINT,
  plugins: [emailOTPClient(), admin(), adminClient()],
  fetchOptions: {
    credentials: "include",
  },
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
  getSession,
  resetPassword,
} = authClient;
