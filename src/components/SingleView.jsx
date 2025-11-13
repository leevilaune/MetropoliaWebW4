import { useEffect, useRef } from "react";

const SingleView = ({ item, setSelectedItem }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (item && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!item && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [item]);

  const handleCancel = (e) => {
    e.preventDefault();
    setSelectedItem(null);
  };

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      className="single-view-dialog"
    >
      <h2>{item.title}</h2>
      <p>{item.description || "No description"}</p>

      {item.media_type.startsWith("image") ? (
        <img
          src={item.filename}
          alt={item.title}
          className="single-view-media"
        />
      ) : item.media_type.startsWith("video") ? (
        <video src={item.filename} controls className="single-view-media" />
      ) : (
        <p>Unsupported media type</p>
      )}

      <button onClick={() => setSelectedItem(null)}>Close</button>
    </dialog>
  );
};

export default SingleView;
