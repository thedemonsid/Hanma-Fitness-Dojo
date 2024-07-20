"use client";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
const KindeLink = ({ type = "login", text }) => {
  switch (type) {
    case "login":
      return <LoginLink>{text || "Sign In"}</LoginLink>;
    case "register":
      return <RegisterLink>{text || "Sign Up"}</RegisterLink>;
    case "logout":
      return <LogoutLink>{text || "Log Out"}</LogoutLink>;
    default:
      return <LoginLink>{text || "Sign In"}</LoginLink>;
  }
};

export default KindeLink;
