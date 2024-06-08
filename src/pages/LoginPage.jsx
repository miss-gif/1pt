import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      sessionStorage.setItem("loggedInUser", username); // 세션에 로그인 정보 저장
      navigate("/dashboard"); // 로그인 성공 시 대시보드 페이지로 이동
    } else {
      setError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인페이지</h2>
      <div>
        <label htmlFor="username">아이디:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">로그인</button>
      {/* 회원가입, 비밀번호 찾기 링크 등 */}
    </form>
  );
}

export default LoginPage;
