import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

function BoardList({ posts, onDelete }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5); // 페이지당 게시물 수
  const [filteredPosts, setFilteredPosts] = useState(posts); // 검색 결과 필터링된 게시물

  const handleRowClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  // 페이지네이션 관련 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 검색 기능
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm)
    );
    setFilteredPosts(filtered);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  return (
    <BoardContainer>
      <h2>게시판</h2>
      <input type="text" placeholder="검색어 입력" onChange={handleSearch} />
      <BoardTable>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <PostClickArea
              key={post.postId}
              onClick={() => handleRowClick(post.postId)}
            >
              <td>{post.postId}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
              <td>{post.likes}</td>
            </PostClickArea>
          ))}
        </tbody>
      </BoardTable>
      <Pagination>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => setCurrentPage(number)}>
            {number}
          </button>
        ))}
      </Pagination>
      <WriteButton to="/write">게시글 쓰기</WriteButton>
    </BoardContainer>
  );
}

export default BoardList;

const BoardContainer = styled.div`
  width: 80%;
  margin: 20px auto;
  font-family: sans-serif;

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  tbody tr:hover {
    background-color: #f5f5f5;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    padding: 8px 12px;
    margin: 0 5px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2;
    }
  }
`;

const WriteButton = styled(Link)`
  display: block;
  width: fit-content;
  padding: 10px 20px;
  margin: 20px auto 0;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const PostClickArea = styled.tr`
  cursor: pointer;
`;
