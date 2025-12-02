import { FormEvent, useState } from "react";

interface EditPostModalProps {
  closeModal: () => void;
  editPost: ({ title, body }: { title: string; body: string }) => void;
  postData: { title: string; body: string; id: number };
}

const EditPostModal = ({
  closeModal,
  editPost,
  postData,
}: EditPostModalProps) => {
  const [post, setPost] = useState({
    title: postData.title,
    body: postData.body,
  });

  const handleEdit = (e: FormEvent) => {
    e.preventDefault();
    if (post.title && post.body)
      editPost({ title: post.title, body: post.body });
    else alert("Fields should not be empty");
  };

  return (
    <div className="modal-container">
      <div className="modal-box">
        <div className="form-heading">
          <p>Edit Post</p>
        </div>
        <form onSubmit={handleEdit}>
          <div>
            <label htmlFor="title">Title</label>
            <br></br>
            <input
              type="text"
              name="title"
              id="title"
              className="input"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
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
              value={post.body}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
              rows={10}
              required
            ></textarea>
          </div>
          <br></br>
          <div className="btn-div">
            <button className="add-btn" type="submit">
              Update
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

export default EditPostModal;
