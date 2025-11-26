"use client";
import React, { useEffect, useState } from "react";
import Post from "../../components/post";
import { useContext } from "react";
import { AuthContext } from "@/context/auth.context";
import { useRouter } from "next/navigation";

interface PostBody {
  body: string;
  title: string;
  id: string;
}

const Page = () => {
  const [post, setPost] = useState<PostBody[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { user } = auth;

  useEffect(() => {
    if (!user.id) {
      // router.push("/");
    }
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
  }

  return (
    <>
      <div className="post-topbar">
        <button className="add-btn">Add Post</button>
        <button className="logout-btn">Logout</button>
      </div>
      {post.map((post) => {
        return <Post key={post.id} title={post.title} content={post.body} />;
      })}
    </>
  );
};

export default Page;
