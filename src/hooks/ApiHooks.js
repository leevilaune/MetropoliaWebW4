import { useEffect, useState } from "react";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || `Error ${response.status}`);
    }
    return json;
  };

  const getMedia = async () => {
    const media = await fetchData(import.meta.env.VITE_MEDIA_API + "/media");

    const mediaWithUsers = await Promise.all(
      media.map(async (item) => {
        const user = await fetchData(
          import.meta.env.VITE_AUTH_API + "/users/" + item.user_id
        );
        return { ...item, username: user.username };
      })
    );

    setMediaArray(mediaWithUsers);
  };

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray };
};

export { useMedia };
