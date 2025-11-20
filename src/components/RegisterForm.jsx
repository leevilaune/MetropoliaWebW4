import React from "react";
import useForm from "../hooks/formHooks";
import { useUser } from "../hooks/ApiHooks";

export const RegisterForm = () => {
  const {postUser} = useUser();
  const initValues = {
    username: "",
    email: "",
    password: "",
  };

  const doRegister = async () => {
    console.log(inputs);
    const authResult = await postUser(inputs);
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doRegister,
    initValues,
  );

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            value={inputs.username}
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            value={inputs.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            value={inputs.password}
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
