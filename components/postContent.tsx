import React from 'react';

interface Content{
    content:string
}
const PostContent = ({content}:Content) => {
    return (
        <div className='post-content'>
            <p>{content}</p>
        </div>
    );
}

export default PostContent;
