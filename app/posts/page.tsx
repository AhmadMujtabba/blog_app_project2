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
  const { user, setUser } = auth;

  const handleLogout = () => {
    setUser({ id: "", name: "", email: "" });
    router.push("/");
  };

  useEffect(() => {
    if (!user.id) {
      router.push("/");
      return;
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
  }, [user.id]);

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
        <p>Hello {user.email}</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {post.map((post) => {
        return <Post key={post.id} title={post.title} content={post.body} />;
      })}
    </>
  );
};

export default Page;
