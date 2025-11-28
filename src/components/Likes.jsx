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
        console.log(media_id);
        const data = await getLikesByMediaId(media_id.media_id);
        console.log(user);
        console.log(await getLikesByUser(user.user_id));
        const userLikes = await getLikesByUser(user.user_id);
        const userLike = userLikes.filter(
          (m) => m.media_id == media_id.media_id,
        )[0].like_id;
        console.log(userLike);
        if (userLike) {
          setUserLikeId(userLike);
        }
        setLikeCount(data.count || 0);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };
    fetchLikes();
  }, [media_id]);
  useEffect(() => {
    console.log("userLikeId updated:", userLikeId);
  }, [userLikeId]);
  const handleLike = async () => {
    try {
      await postLike(media_id.media_id);
      setLikeCount((prev) => prev + 1);
      const userLikes = await getLikesByUser(user.user_id);
      const userLike = userLikes.filter(
        (m) => m.media_id == media_id.media_id,
      )[0].like_id;
      console.log(userLike);
      if (userLike) {
        setUserLikeId(userLike);
      }
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
