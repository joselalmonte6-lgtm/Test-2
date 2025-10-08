import React from "react";
import LoginForm from "../components/LoginForm";

function LoginPage({ setUser }) {
  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm setUser={setUser} />
    </div>
  );
}

export default LoginPage;
