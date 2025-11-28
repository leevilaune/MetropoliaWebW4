import React from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router";
import Likes from "../components/Likes";

const Single = ({ setSelectedItem }) => {
  const { state } = useLocation();
  const item = state?.item;

  const navigate = useNavigate();

  if (!item) return <p>No item selected.</p>;

  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.description || "No description"}</p>
      <p>{item.username}</p>
      {item.media_type.startsWith("image") ? (
        <img src={item.filename} alt={item.title} className="single-view-media" />
      ) : item.media_type.startsWith("video") ? (
        <video src={item.filename} controls className="single-view-media" />
      ) : (
        <p>Unsupported media type</p>
      )}
      <Likes media_id={item.media_id}></Likes>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

Single.propTypes = {
  setSelectedItem: PropTypes.func
};

export default Single;
