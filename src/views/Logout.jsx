import React from "react";
import Layout from "../components/Layout";
import { useUserContext } from "../hooks/contextHooks";
import { useEffect } from "react";

const Logout = () => {
  const { handleLogout } = useUserContext();

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <>
      <Layout />
    </>
  );
};

export default Logout;
