import React from "react";

interface CloseModalFn {
  CloseModal: () => void;
  AddPost: () => void;
  AddTitle: (value: string) => void;
  AddBody: (value: string) => void;
}

const AddPostModal = ({
  CloseModal,
  AddPost,
  AddTitle,
  AddBody,
}: CloseModalFn) => {
  return (
    <>
      <div></div>
      <div className="modal-box">
        <div className="form-heading">
          <p>Add Post</p>
        </div>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <br></br>
            <input
              type="text"
              name="title"
              id="title"
              className="input"
              onChange={(e) => AddTitle(e.target.value)}
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
              onChange={(e) => AddBody(e.target.value)}
              required
            ></textarea>
          </div>
          <br></br>
          <div className="btn-div">
            <button
              className="add-btn"
              onClick={(e) => {
                e.preventDefault();
                AddPost();
              }}
            >
              Add
            </button>
            <button className="logout-btn" onClick={CloseModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPostModal;
