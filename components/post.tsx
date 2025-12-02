import { Trash, Pencil } from "lucide-react";
import PostContent from "./PostContent";
import PostTitle from "./PostTitle";

interface Post {
  title: string;
  content: string;
  userName: string;
  id: number;
  owner: boolean;
  editPost: (id: number) => void;
  deletePost: (id: number) => void;
}

const Post = ({
  title,
  content,
  userName,
  id,
  owner,
  deletePost,
  editPost,
}: Post) => {
  return (
    <div className="post-body">
      {owner && (
        <div className="post-action-div">
          <button
            className="post-delete-btn"
            onClick={(e) => {
              e.preventDefault();
              deletePost(id);
            }}
          >
            <Trash />
          </button>
          <button
            className="post-edit-btn"
            onClick={(e) => {
              e.preventDefault();
              editPost(id);
            }}
          >
            <Pencil />
          </button>
        </div>
      )}
      <PostTitle title={title} />
      <PostContent content={content} />
      <hr></hr>
      <div className="post-user-details">
        <p>By : {userName}</p>
      </div>
    </div>
  );
};

export default Post;
