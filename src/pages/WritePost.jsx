import { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal"; // react-modal 라이브러리 사용

Modal.setAppElement("#root"); // 모달 앱 엘리먼트 설정

const WritePost = ({ addPost, postIdRef }) => {
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const newPost = {
      postId: postIdRef.current, // props로 받은 postIdRef 사용
      title,
      content,
      author: "작성자", // 작성자 정보 추가 (필요에 따라 수정)
      date: new Date().toLocaleDateString(), // 현재 날짜
      views: 0,
      likes: 0,
    };
    addPost(newPost); // App 컴포넌트의 addPost 함수 호출
    // 모달 열기
    setShowModal(true);
  };

  const handleCloseModal = (destination) => {
    setShowModal(false);
    navigate(destination); // 선택한 페이지로 이동
  };

  return (
    <FormContainer>
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
      />
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      <StyledModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="게시글 작성 완료"
      >
        <h3>게시글 작성 완료</h3>
        <p>어디로 이동하시겠습니까?</p>
        <div>
          <button onClick={() => handleCloseModal("/")}>게시판 목록</button>
          <button
            onClick={() => handleCloseModal(`/post/${postIdRef.current - 1}`)}
          >
            게시글 상세
          </button>
        </div>
      </StyledModal>
    </FormContainer>
  );
};
export default WritePost;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

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
