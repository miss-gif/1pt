import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";

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
    <Container>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      ></Textarea>
      <button onClick={handleUpdate}>수정</button>
    </Container>
  );
};

export default EditPost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 요소 간 간격 */

  @media (max-width: 768px) {
    /* 화면 너비가 768px 이하일 때 */
    width: 90%; /* 컨테이너 너비 조절 */
    margin: 0 auto; /* 가운데 정렬 */
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical; /* 세로 크기 조절만 가능 */
  min-height: 150px; /* 최소 높이 설정 */
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
