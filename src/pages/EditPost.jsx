import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = ({ posts, onUpdate }) => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <div>
      <button onClick={handleUpdate}>수정</button>
    </div>
  );
};

export default EditPost;
