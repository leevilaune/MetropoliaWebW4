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

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray };
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
  return { user, loading, error, postUser };
};

export { useMedia, useAuthentication, useUser };
