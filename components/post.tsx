import { Trash, Pencil } from "lucide-react";
import PostContent from "./PostContent";
import PostTitle from "./PostTitle";
import CommentBlock from "./CommentBlock";

interface Post {
  title: string;
  content: string;
  userName: string;
  authUserData: { id: number; name: string; email: string } | undefined;
  id: number;
  owner: boolean;
  editPost: (id: number) => void;
  deletePost: (id: number) => void;
}

const Post = ({
  title,
  content,
  userName,
  authUserData,
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
      <br></br>
      <div className="post-user-details">
        <p>By : {userName}</p>
      </div>
      <hr></hr>
      <CommentBlock postId={id} authUserData={authUserData} />
    </div>
  );
};

export default Post;
