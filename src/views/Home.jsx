import { useState, useEffect } from "react";
import MediaRow from "../components/MediaRow";
import SingleView from "../components/SingleView";

const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    if (json.message) {
      throw new Error(json.message);
    }
    throw new Error(`Error ${response.status} occurred`);
  }
  return json;
};

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const getMediaWithUsers = async () => {
      try {
        const media = await fetchData(import.meta.env.VITE_MEDIA_API + "/media");

        const mediaWithUsers = await Promise.all(
          media.map(async (item) => {
            const user = await fetchData(import.meta.env.VITE_AUTH_API + "/users/" + item.user_id);
            return { ...item, username: user.username };
          })
        );

        setMediaArray(mediaWithUsers);
        console.log(mediaWithUsers);
      } catch (error) {
        console.error(error);
      }
    };

    getMediaWithUsers();
  }, []);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Username</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
    </>
  );
};

export default Home;
