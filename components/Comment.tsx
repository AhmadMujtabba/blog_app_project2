import { SquarePen, Trash } from "lucide-react";

interface CommentProps {
  commentData: { body: string; name: string; id: number };
  owner: boolean;
  deleteComment: (commentId: number) => void;
}

const Comment = ({ commentData, owner, deleteComment }: CommentProps) => {
  return (
    <div className="comment-block">
      <div className="comment-topbar">
        <div>
          <p>{commentData.name}</p>
        </div>
        {owner && (
          <div className="action-bar">
            <button>
              <SquarePen height={15} width={15} />
            </button>
            <button onClick={() => deleteComment(commentData.id)}>
              <Trash height={15} width={15} />
            </button>
          </div>
        )}
      </div>
      <p>{commentData.body}</p>
    </div>
  );
};

export default Comment;
