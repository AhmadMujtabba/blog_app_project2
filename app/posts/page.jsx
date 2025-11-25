"use client";
import React, { useEffect, useState } from "react";
import Post from "@/components/post";
const Page = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        setPost(data);
      } catch {
        console.log(Error);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, []);
  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <>
        {post.map((post) => {
          return <Post key={post.id} title={post.title} content={post.body} />;
        })}
      </>
    );
  }
};

export default Page;
