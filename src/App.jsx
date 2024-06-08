import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardList from "./pages/BoardList"; // 게시판 리스트 페이지
import WritePost from "./pages/WritePost"; // 게시글 작성 페이지
import PostDetail from "./pages/PostDetail"; // 게시글 상세 페이지
import EditPost from "./pages/EditPost"; // 게시글 수정 페이지
import { dummy } from "./pages/dummy";

function App() {
  const [posts, setPosts] = useState(dummy); // 게시글 데이터 상태
  const [postId, setPostId] = useState(27); // 상태로 postId 관리

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]); // 새로운 게시글 추가
    setPostId(postId + 1); // postId 업데이트
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.postId !== postId);
    setPosts(updatedPosts);
  };

  const handleUpdate = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post.postId === updatedPost.postId ? updatedPost : post
    );
    setPosts(updatedPosts); // 수정된 게시글 목록으로 상태 업데이트
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardList posts={posts} />} />
        <Route
          path="/write"
          element={<WritePost addPost={addPost} postId={postId} />}
        />
        <Route
          path="/post/:postId"
          element={<PostDetail posts={posts} onDelete={handleDelete} />}
        />
        <Route
          path="/edit/:postId"
          element={<EditPost posts={posts} onUpdate={handleUpdate} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
