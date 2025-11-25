import React from 'react';
import PostTitle from './postTitle';
import PostContent from './postContent';
const Post = ({title,content}) => {
    return (
        <div className='post-body'>
            <PostTitle title={title}/>
            <PostContent content={content}/>
        </div>
    );
}

export default Post;
