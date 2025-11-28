import React from "react";

interface TitleProp {
  title: string;
}

const PostTitle = ({ title }: TitleProp) => {
  return (
    <div className="post-title">
      <p>{title}</p>
    </div>
  );
};

export default PostTitle;
