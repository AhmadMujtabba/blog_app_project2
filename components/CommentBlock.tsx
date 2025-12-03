import { SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import Comment from "./Comment";

interface CommentProps {
  postId: number;
  authUserData: { id: number; name: string; email: string } | undefined;
}

interface CommentObject {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const CommentBlock = ({ postId, authUserData }: CommentProps) => {
  const [comments, setComments] = useState<CommentObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState({
    id: -1,
    name: authUserData?.name,
    body: "",
    email: authUserData?.email,
    postId: postId,
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        const data = await res.json();
        setComments(data);
      } catch {
        console.log(Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  const handleNewComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (authUserData?.id && comment.body) {
      const lastId = comments.at(-1)?.id ?? 0;
      const newCommentObj = {
        ...comment,
        body: comment.body,
        id: lastId + 1,
        name: authUserData.name,
        email: authUserData.email,
      };
      setComments([...comments, newCommentObj]);
      setComment({ ...comment, body: "" });
    } else alert("Write something to comment !");
  };

  const handleDeleteComment = (commentId: number) => {
    if (confirm("Do you want to delete comment ?")) {
      const updatedComments = [...comments];
      const index = updatedComments.findIndex((p) => p.id === commentId);
      updatedComments.splice(index, 1);
      setComments(updatedComments);
    }
  };

  if (loading) {
    return (
      <div className="">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {comments.map((comment) => (
        <Comment
          commentData={comment}
          key={comment.id}
          owner={comment.email === authUserData?.email}
          deleteComment={handleDeleteComment}
        />
      ))}

      <div className="add-comment-block">
        <form onSubmit={handleNewComment} className="add-comment-block">
          <input
            className="comment-input"
            type="text"
            placeholder="Enter Comment..."
            onChange={(e) => setComment({ ...comment, body: e.target.value })}
            value={comment.body}
            required
          />
          <button type="submit">
            <SendHorizontal height={15} width={15} className="send-icon" />
          </button>
        </form>
      </div>
    </>
  );
};

export default CommentBlock;
