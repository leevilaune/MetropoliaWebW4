import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import { useUser } from "../hooks/apiHooks";

const Profile = () => {
  const { user, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <>
      <Layout />
      <h1>{user.username}</h1>
      <p>Email: {user.email}</p>
      <p>CreatedAt: {user.created_at}</p>
      <p>Role: {user.level_name}</p>
    </>
  );
};

Profile.propTypes = {};

export default Profile;
