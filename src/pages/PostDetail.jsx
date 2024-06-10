import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styled from "@emotion/styled";
import CommentComponent from "./CommentContainer";

const PostDetail = ({ posts, onDelete }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const post = posts.find((post) => post.postId === parseInt(postId, 10));

  const handleDelete = () => {
    onDelete(post.postId);
    navigate("/notice");
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => navigate(`/notice/post/${parseInt(postId, 10) - 1}`)}
      >
        이전글
      </button>
      <button
        onClick={() => navigate(`/notice/post/${parseInt(postId, 10) + 1}`)}
      >
        다음글
      </button>
      <button onClick={() => navigate("/notice")}>목록</button>
      <DetailContainer>
        <p>디테일페이지</p>
        {post ? (
          <div>
            <DetailTitle>{post.title}</DetailTitle>
            <DetailInfo>{post.content}</DetailInfo>
            <DetailInfo>작성자: {post.author}</DetailInfo>
            <DetailInfo>작성일: {post.date}</DetailInfo>
            <DetailInfo>조회수: {post.views}</DetailInfo>
            <DetailInfo>좋아요: {post.likes}</DetailInfo>

            <ButtonContainer>
              <ActionButton onClick={() => navigate(`/notice/edit/${postId}`)}>
                수정
              </ActionButton>
              <ActionButton className="delete" onClick={handleDeleteClick}>
                삭제
              </ActionButton>
            </ButtonContainer>

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
        <CommentComponent />
      </DetailContainer>
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

const DetailContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: sans-serif;
`;

const DetailTitle = styled.h2`
  margin-bottom: 10px;
`;

const DetailInfo = styled.p`
  margin: 5px 0;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &.delete {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
`;
