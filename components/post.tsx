import { Trash, Pencil } from "lucide-react";
import PostTitle from "./postTitle";
import PostContent from "./postContent";

interface Post {
  title: string;
  content: string;
  postid: number;
  userid: number;
  owner: boolean;
  editPost: (postid: number) => void;
  deletePost: (postid: number) => void;
}

const Post = ({
  title,
  content,
  postid,
  userid,
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
              deletePost(postid);
            }}
          >
            <Trash />
          </button>
          <button
            className="post-edit-btn"
            onClick={(e) => {
              e.preventDefault();
              editPost(postid);
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
        <p>By:{userid}</p>
        <p>Post:{postid}</p>
      </div>
    </div>
  );
};

export default Post;
