import { useState } from "react";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin((prev) => !prev);

  return (
    <>
      <Layout />

      <div className="auth-container">
        {showLogin ? <LoginForm /> : <RegisterForm />}

        <button onClick={toggleForm}>
          {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </>
  );
};

export default Login;
