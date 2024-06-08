import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styled from "@emotion/styled";

const PostDetail = ({ posts, onDelete }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const post = posts.find((post) => post.postId === parseInt(postId, 10)); // 검색

  const handleDelete = () => {
    console.log(postId); // 삭제할 게시물의 postId
    onDelete(post.postId);
    navigate("/");
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <p>디테일페이지</p>
      {post ? (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {/* ... (나머지 게시물 정보) */}
          <button onClick={() => navigate(`/edit/${postId}`)}>수정</button>
          <button onClick={handleDeleteClick}>삭제</button>

          <StyledModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            contentLabel="삭제 확인"
          >
            <p>정말로 삭제하시겠습니까?</p>
            <div>
              <button onClick={handleDelete}>삭제</button>
              <button onClick={handleCloseModal}>취소</button>
            </div>
          </StyledModal>
        </div>
      ) : (
        <p>게시물을 찾을 수 없습니다.</p>
      )}
    </>
  );
};

export default PostDetail;

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 40px 20px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;

  p {
    margin: 0;
  }

  button {
    padding: 8px 15px;
    margin-right: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
