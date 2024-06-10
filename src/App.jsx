import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/AuthContext";

import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Header from "./pages/header";

import Home from "./pages/Home";
import Notice from "./pages/notice/Notice";
import PostWrite from "./pages/notice/PostWrite";
import PostDetail from "./pages/notice/PostDetail";
import PostEdit from "./pages/notice/PostEdit";

import usePosts from "./hooks/usePosts"; // Custom hook import

function App() {
  const { posts, addPost, handleDelete, handleUpdate, postIdRef } = usePosts();

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
