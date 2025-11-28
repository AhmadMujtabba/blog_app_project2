"use client";
import { useEffect, useState, useContext } from "react";
import Post from "../../components/post";
import { AuthContext } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import AddPostModal from "@/components/addPostModal";
import EditPostModal from "@/components/editPostModal";

interface PostBody {
  body: string;
  title: string;
  id: number;
  userId: number;
}

const Page = () => {
  const [post, setPost] = useState<PostBody[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);
  const [showEditPostModal, setShowEditPostModal] = useState<boolean>(false);
  const [userPostTitle, setUserPostTitle] = useState<string>("");
  const [userPostBody, setUserPostBody] = useState<string>("");
  const [selectedPostForEditId, setSelectedPostForEditId] = useState<
    number | null
  >(null);

  const router = useRouter();
  const auth = useContext(AuthContext);

  const user = auth?.user;
  const setUser = auth?.setUser;

  useEffect(() => {
    if (!user) {
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
  }, [user]);

  const handleLogout = () => {
    if (setUser) setUser(undefined);
    router.push("/");
  };

  const handleOpenAddPostModal = () => {
    setShowAddPostModal(true);
    setShowEditPostModal(false);
  };

  const handleCloseAddPostModal = () => {
    setShowAddPostModal(false);
  };

  const handleOpenEditPostModal = (postid: number) => {
    setShowEditPostModal(true);
    setShowAddPostModal(false);
    const postarr = [...post];
    const postobj = postarr.find((p) => p.id === postid);
    if (postobj) {
      setUserPostTitle(postobj.title);
      setUserPostBody(postobj.body);
      setSelectedPostForEditId(postobj.id);
    }
  };

  const handleEditedPost = () => {
    setShowEditPostModal(false);
    const postid = selectedPostForEditId;
    let postarr = [...post];
    const index = postarr.findIndex((p) => p.id === postid);
    const editedobj = {
      ...postarr[index],
      title: userPostTitle,
      body: userPostBody,
    };
    postarr[index] = editedobj;
    setPost(postarr);
    alert("Post updated successfully");
    setSelectedPostForEditId(null);
  };

  const handleCloseEditPostModal = () => {
    setShowEditPostModal(false);
  };

  const handleNewPostTitle = (title: string) => {
    setUserPostTitle(title);
  };

  const handleNewPostBody = (body: string) => {
    setUserPostBody(body);
  };

  const handleDeletePost = (postid: number) => {
    if (confirm("Do you want to delete post ?")) {
      const postarr = [...post];
      const index = postarr.findIndex((p) => p.id === postid);
      postarr.splice(index, 1);
      setPost(postarr);
    }
  };

  const handleNewPost = () => {
    if (user) {
      const newPost = {
        userId: Number(user.id),
        id: Number(post.at(-1)!.id + 1),
        title: userPostTitle,
        body: userPostBody,
      };
      setPost([...post, newPost]);
      setShowAddPostModal(false);
      setUserPostBody("");
      setUserPostTitle("");
      alert("Post created successfully !");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {showAddPostModal && (
        <AddPostModal
          CloseModal={handleCloseAddPostModal}
          AddPost={handleNewPost}
          AddTitle={handleNewPostTitle}
          AddBody={handleNewPostBody}
        />
      )}
      {showEditPostModal && (
        <EditPostModal
          CloseModal={handleCloseEditPostModal}
          EditPost={handleEditedPost}
          AddTitle={handleNewPostTitle}
          AddBody={handleNewPostBody}
          Title={userPostTitle}
          Body={userPostBody}
          PostId={selectedPostForEditId}
        />
      )}

      <div className="post-topbar">
        <button className="add-btn" onClick={handleOpenAddPostModal}>
          Add Post
        </button>
        {user && (
          <p>
            <b>
              HELLO, {user.name.toUpperCase()} {user.id}
            </b>
          </p>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {post.map((post) => {
        let owner = false;
        if (Number(user?.id) === post.userId) {
          owner = true;
        }
        return (
          <Post
            key={post.id}
            title={post.title}
            content={post.body}
            postid={post.id}
            userid={post.userId}
            owner={owner}
            deletePost={handleDeletePost}
            editPost={handleOpenEditPostModal}
          />
        );
      })}
    </>
  );
};

export default Page;
