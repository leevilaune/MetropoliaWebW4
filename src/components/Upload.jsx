import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useUpload } from "../hooks/apiHooks";
import useForm from "../hooks/FormHooks";
import { Navigate, useNavigate } from "react-router";
import { useMedia } from "../hooks/apiHooks";

const Upload = () => {
  const initValues = {
    title: "",
    description: "",
  };

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (evt) => {
    if (evt.target.files?.length > 0) {
      const selected = evt.target.files[0];
      setFile(selected);
      console.log("Selected:", selected);
    }
  };
  const { postFile } = useUpload();
  const { postMedia } = useMedia();

  const doUpload = async () => {
    if (!file) return;
    const token = localStorage.getItem("TOKEN");
    try {
      const uploadResult = await postFile(file);
      console.log(uploadResult);
      const filename = uploadResult.data.filename;
      const mediaType = file.type;
      const filesize = file.size;
      const mediaResult = await postMedia(
        {
          title: inputs.title,
          description: inputs.description,
          filename,
          media_type: mediaType,
          filesize,
        },
        token,
      );

      console.log("Created media:", mediaResult);

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doUpload,
    initValues,
  );
  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : "https://via.placeholder.com/200?text=Choose+image"
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={file && inputs.title.length > 3 ? false : true}
        >
          Upload
        </button>
      </form>
    </>
  );
};

Upload.propTypes = {};

export default Upload;
