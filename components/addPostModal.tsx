import { FormEvent, useState } from "react";

interface AddPostModalProps {
  closeModal: () => void;
  addPost: ({ title, body }: { title: string; body: string }) => void;
}

const AddPostModal = ({ closeModal, addPost }: AddPostModalProps) => {
  const [userPost, setUserPost] = useState({ title: "", body: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userPost.title && userPost.body) addPost(userPost);
    else alert("Fields should not be empty !");
  };

  return (
    <div className="modal-container">
      <div className="modal-box">
        <div className="form-heading">
          <p>Add Post</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <br></br>
            <input
              type="text"
              name="title"
              id="title"
              className="input"
              onChange={(e) =>
                setUserPost({ ...userPost, title: e.target.value })
              }
              required
            ></input>
          </div>
          <br></br>
          <div>
            <label htmlFor="content">Content</label>
            <br></br>
            <textarea
              name="content"
              id="content"
              className="input"
              onChange={(e) =>
                setUserPost({ ...userPost, body: e.target.value })
              }
              rows={10}
              required
            ></textarea>
          </div>
          <br></br>
          <div className="btn-div">
            <button className="add-btn" type="submit">
              Add
            </button>
            <button className="logout-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
