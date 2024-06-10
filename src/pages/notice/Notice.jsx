import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notice.scss";

function Notice({ posts }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // 페이지당 게시물 수
  const [filteredPosts, setFilteredPosts] = useState(posts); // 검색 결과 필터링된 게시물

  const handleRowClick = (postId) => {
    navigate(`/notice/post/${postId}`);
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
    <div className="inner">
      <article className="notice">
        <h2>게시판</h2>
        <div className="notice__top">
          <button className="best-post btn">추천글</button>
          <div className="notice__top__icon">
            {/* <button>뷰icon</button> */}
            {/* <button>뷰icon</button> */}
            <Link to="/notice/write" className="btn">
              글쓰기
            </Link>
          </div>
        </div>

        <table className="notice__center">
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
              <tr key={post.postId} onClick={() => handleRowClick(post.postId)}>
                <td>{post.postId}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
                <td>{post.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="notice__bottom">
          <Link to="/notice/write" className="btn">
            글쓰기
          </Link>
        </div>

        <div className="notice__pagination">
          {pageNumbers.map((number) => (
            <button key={number} onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          ))}
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={handleSearch}
          />
          <button>검색</button>
        </div>
      </article>
    </div>
  );
}

export default Notice;
