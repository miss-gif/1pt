import "./App.css";

import { useRef, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { dummy } from "./api/dummy";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import Header from "./pages/header";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./pages/AuthContext";

import Home from "./pages/Home";
import Notice from "./pages/notice/Notice";
import PostWrite from "./pages/notice/PostWrite";
import PostDetail from "./pages/notice/PostDetail"; // 게시글 상세 페이지
import PostEdit from "./pages/notice/PostEdit";

function App() {
  const [posts, setPosts] = useState(dummy); // 게시글 데이터 상태
  const postIdRef = useRef(26); // useRef를 App 컴포넌트에서 관리

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]); // 새로운 게시글 추가
    postIdRef.current += 1; // postId 업데이트
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
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notice" element={<Notice posts={posts} />} />
          <Route
            path="/notice/write"
            element={<PostWrite addPost={addPost} postIdRef={postIdRef} />}
          />
          <Route
            path="/notice/post/:postId"
            element={<PostDetail posts={posts} onDelete={handleDelete} />}
          />
          <Route
            path="/notice/edit/:postId"
            element={<PostEdit posts={posts} onUpdate={handleUpdate} />}
          />
          {/* 추가된 라우터 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
