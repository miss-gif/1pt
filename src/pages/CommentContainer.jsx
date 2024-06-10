import React, { useState } from "react";
import styled from "@emotion/styled";

const CommentComponent = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [replyInputVisible, setReplyInputVisible] = useState({}); // 답글 입력창 표시 여부
  const [replyContent, setReplyContent] = useState(""); // 답글 내용

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleDelete = (index) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);
  };

  const handleReplyToggle = (commentId) => {
    setReplyInputVisible({
      ...replyInputVisible,
      [commentId]: !replyInputVisible[commentId],
    });
    setReplyContent("");
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };

  const handleReplySubmit = (parentCommentId) => {
    if (replyContent.trim() !== "") {
      onAddComment(parentCommentId, replyContent);
      setReplyInputVisible({ ...replyInputVisible, [parentCommentId]: false });
      setReplyContent("");
    }
  };

  return (
    <CommentContainer>
      <label htmlFor="comment">댓글</label>
      <CommentInput
        type="text"
        value={comment}
        id="comment"
        onChange={handleInputChange}
        placeholder="댓글을 입력하세요"
      />
      <button onClick={handleSubmit}>등록</button>
      <CommentList>
        {comments.map((comment, index) => (
          <CommentItem key={index}>
            {comment}
            <DeleteButton onClick={() => handleDelete(index)}>
              삭제
            </DeleteButton>
          </CommentItem>
        ))}
      </CommentList>
    </CommentContainer>
  );
};

export default CommentComponent;

const CommentContainer = styled.div`
  margin-top: 20px;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;
