"use client";
import { useEffect, useState, useContext } from "react";
import Post from "../../components/Post";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AddPostModal from "@/components/AddPostModal";
import EditPostModal from "@/components/EditPostModal";

interface PostBody {
  id: number;
  body: string;
  title: string;
  userId: number;
}

type PostEdit = Omit<PostBody, "userId">;

type UserInfo = {
  id: number;
  name: string;
};

const Page = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [posts, setPosts] = useState<PostBody[]>([]);
  const [usersInfo, setUsersInfo] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAddPostModal, setShowAddPostModal] = useState<boolean>(false);
  const [showEditPostModal, setShowEditPostModal] = useState<boolean>(false);
  const [selectedPostForEdit, setSelectedPostForEdit] = useState<PostEdit>({
    id: -1,
    title: "",
    body: "",
  });

  const user = auth?.user;
  const setUser = auth?.setUser;

  useEffect(() => {
    document.body.style.overflow =
      showAddPostModal || showEditPostModal ? "hidden" : "auto";
  }, [showAddPostModal, showEditPostModal]);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        const userInfoRes = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersInfoData = await userInfoRes.json();
        setUsersInfo(usersInfoData);
        setPosts(data);
      } catch {
        console.log(Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handleLogout = () => {
    if (setUser) setUser(undefined);
    router.push("/");
  };

  const handleOpenAddPostModal = () => {
    setShowAddPostModal(true);
    setShowEditPostModal(false);
  };

  const handleOpenEditPostModal = (postId: number) => {
    setShowEditPostModal(true);
    setShowAddPostModal(false);
    const updatedPosts = [...posts];
    const postObj = updatedPosts.find((p) => p.id === postId);
    if (postObj) {
      setSelectedPostForEdit({
        title: postObj.title,
        body: postObj.body,
        id: postObj.id,
      });
    }
  };

  const handleEditedPost = (editedPost: { title: string; body: string }) => {
    if (selectedPostForEdit.id > 0) {
      setShowEditPostModal(false);
      const postId = selectedPostForEdit.id;
      let updatedPosts = [...posts];
      const index = updatedPosts.findIndex((p) => p.id === postId);
      const editedObj = {
        ...updatedPosts[index],
        title: editedPost.title,
        body: editedPost.body,
      };
      updatedPosts[index] = editedObj;
      setPosts(updatedPosts);
      alert("Post updated successfully");
      setSelectedPostForEdit({ ...selectedPostForEdit, id: -1 });
    }
  };

  const handleDeletePost = (postId: number) => {
    if (confirm("Do you want to delete post ?")) {
      const updatedPosts = [...posts];
      const index = updatedPosts.findIndex((p) => p.id === postId);
      updatedPosts.splice(index, 1);
      setPosts(updatedPosts);
    }
  };

  const handleNewPost = (newPost: { title: string; body: string }) => {
    if (user) {
      const newPostObj = {
        userId: Number(user.id),
        id: Number(posts.at(-1)!.id + 1),
        ...newPost,
      };
      setPosts([...posts, newPostObj]);
      setShowAddPostModal(false);
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
          closeModal={() => setShowAddPostModal(false)}
          addPost={handleNewPost}
        />
      )}
      {showEditPostModal && (
        <EditPostModal
          closeModal={() => setShowEditPostModal(false)}
          editPost={handleEditedPost}
          postData={selectedPostForEdit}
        />
      )}

      <div className="post-topbar">
        <button className="add-btn" onClick={handleOpenAddPostModal}>
          Add Post
        </button>
        {user && (
          <p>
            <b>HELLO, {user.name.toUpperCase()}</b>
          </p>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {posts
        .slice()
        .reverse()
        .map((post) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.body}
            id={post.id}
            owner={Number(user?.id) === post.userId}
            deletePost={handleDeletePost}
            editPost={handleOpenEditPostModal}
            userName={
              usersInfo.find((user) => user.id === post.userId)?.name ||
              user?.name ||
              "Unknown"
            }
          />
        ))}
    </>
  );
};

export default Page;
