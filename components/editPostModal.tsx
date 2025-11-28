

interface CloseModalFn {
  CloseModal: () => void;
  EditPost: () => void;
  AddTitle: (value: string) => void;
  AddBody: (value: string) => void;
  Title: string;
  Body: string;
  PostId: number | null;
}

const EditPostModal = ({
  CloseModal,
  EditPost,
  AddTitle,
  AddBody,
  Title,
  Body,
  PostId,
}: CloseModalFn) => {
  return (
    <>
      <div></div>
      <div className="modal-box">
        <div className="form-heading">
          <p>Edit Post</p>
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
              value={Title}
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
              value={Body}
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
                EditPost();
              }}
            >
              Update
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

export default EditPostModal;
