import React, { useEffect } from "react";
import { useLike } from "../hooks/ApiHooks";
import { useState } from "react";
import { useUserContext } from "../hooks/contextHooks";

const Likes = (media_id) => {
  const [userLikeId, setUserLikeId] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useUserContext();

  const { postLike, deleteLike, getLikesByMediaId, getLikesByUser } = useLike();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getLikesByMediaId(media_id.media_id);
        console.log(data);
        setLikeCount(data.count || 0);

        const userLikes = await getLikesByUser(user.user_id);

        if (!Array.isArray(userLikes)) {
          setUserLikeId(0);
          return;
        }

        const match = userLikes.find((m) => m.media_id === media_id.media_id);

        setUserLikeId(match ? match.like_id : 0);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };

    fetchLikes();
  }, [media_id.media_id]);
  useEffect(() => {
    console.log("userLikeId updated:", userLikeId);
  }, [userLikeId]);
  const handleLike = async () => {
    try {
      await postLike(media_id.media_id);
      setLikeCount((prev) => prev + 1);
      const userLikes = await getLikesByUser(user.user_id);
      const filtered = userLikes.filter((m) => m.media_id == media_id.media_id);
      const userLike = filtered.length > 0 ? filtered[0].like_id : 0;
      setUserLikeId(userLike);
    } catch (err) {
      console.error("Error liking media:", err);
    }
  };

  const handleDislike = async () => {
    try {
      await deleteLike(userLikeId);
      setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
      setUserLikeId(0);
    } catch (err) {
      console.error("Error disliking media:", err);
    }
  };

  return (
    <div>
      <p>Like count: {likeCount}</p>
      {userLikeId === 0 ? (
        <button
          className="bg-green-500 px-3 py-1 rounded text-white"
          onClick={handleLike}
        >
          Like
        </button>
      ) : (
        <button
          className="bg-red-500 px-3 py-1 rounded text-white"
          onClick={handleDislike}
        >
          Dislike
        </button>
      )}
    </div>
  );
};

export default Likes;
