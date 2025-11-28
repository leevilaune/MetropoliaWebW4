import { Link, useNavigate } from "react-router";

const MediaRow = ({ item, user, deleteMedia }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteMedia(item);
    navigate(0);
  };

  const isOwner =
    user && (user.user_id === item.user_id || user.level_name === "admin");

  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.username}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString("fi-FI")}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>

      <td>
        <Link to="/single" state={{ item }}>
          Show
        </Link>
      </td>

      {isOwner && (
        <>
          <td>
            <button
              className="my-2 px-4 py-2 rounded bg-[#363636] text-white cursor-pointer"
              onClick={() => console.log("modify/delete", item)}
            >
              Modify
            </button>
          </td>
          <td>
            <button
              className="my-2 px-4 py-2 rounded bg-[#363636] text-white cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default MediaRow;
