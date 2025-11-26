import React from 'react';
import PostTitle from './postTitle';
import PostContent from './postContent';

interface Post{
    title:string
    content:string
}
const Post = ({title,content}: Post) => {
    return (
        <div className='post-body'>
            <PostTitle title={title}/>
            <PostContent content={content}/>
        </div>
    );
}

export default Post;
