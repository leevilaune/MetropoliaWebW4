import { useEffect, useState } from "react";
import fetchData from "../util/fetchData";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    const media = await fetchData(import.meta.env.VITE_MEDIA_API + "/media");

    const mediaWithUsers = await Promise.all(
      media.map(async (item) => {
        const user = await fetchData(
          import.meta.env.VITE_AUTH_API + "/users/" + item.user_id,
        );
        return { ...item, username: user.username };
      }),
    );

    setMediaArray(mediaWithUsers);
  };

  const postMedia = async (mediaData, token) => {
    console.log(mediaData);
    const response = await fetch(import.meta.env.VITE_MEDIA_API + "/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mediaData),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Server response:", text);
      throw new Error("Media POST failed");
    }

    return await response.json();
  };

  const deleteMedia = async (mediaData) => {
    console.log("Deleting media ", mediaData);
    const token = localStorage.getItem("TOKEN");

    const response = await fetch(
      import.meta.env.VITE_MEDIA_API + "/media" + `/${mediaData.media_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const text = await response.text();
      console.error("Server response:", text);
      throw new Error("Media DELETE failed");
    }

    return await response.json();
  };

  useEffect(() => {
    getMedia();
  }, []);
  return { mediaArray, postMedia, deleteMedia };
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + "/auth/login",
      fetchOptions,
    );
    return loginResult;
  };
  return { auth: { postLogin } };
};

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("TOKEN");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchData(
          import.meta.env.VITE_AUTH_API + "/users/token",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUser(data.user);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const getUserByToken = async () => {
    const token = localStorage.getItem("TOKEN");
    if (!token) throw new Error("No token found");

    try {
      const data = await fetchData(
        import.meta.env.VITE_AUTH_API + "/users/token",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(data.user);
      return data.user;
    } catch (err) {
      setError(err);
      throw err;
    }
  };
  const postUser = async (formData) => {
    try {
      const result = await fetchData(import.meta.env.VITE_AUTH_API + "/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      return result;
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };
  return { user, loading, error, postUser, getUserByToken };
};

const useUpload = () => {
  const [error, setError] = useState(null);

  const postFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        import.meta.env.VITE_UPLOAD_SERVER + "/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  return { postFile };
};

export { useMedia, useAuthentication, useUser, useUpload };
