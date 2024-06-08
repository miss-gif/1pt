import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = ({ posts, onUpdate }) => {
  console.log("posts", posts);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const postToEdit = posts.find(
      (post) => post.postId === parseInt(postId, 10)
    );

    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    } else {
      alert("게시물을 찾을 수 없습니다.");
      navigate("/");
    }
  }, [postId, posts]);

  const handleUpdate = () => {
    const postToEdit = posts.find(
      (post) => post.postId === parseInt(postId, 10)
    );

    if (!postToEdit) {
      alert("게시물을 찾을 수 없습니다.");
      return;
    }

    const updatedPost = {
      ...postToEdit, // 기존 게시글 정보 복사
      title: title, // 수정된 제목
      content: content, // 수정된 내용
      date: new Date().toLocaleDateString(), // 수정된 날짜
    };

    onUpdate(updatedPost);
    navigate(`/post/${postId}`);
  };

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      ></textarea>
      <button onClick={handleUpdate}>수정</button>
    </>
  );
};

export default EditPost;
