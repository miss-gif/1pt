import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.find((u) => u.username === username)) {
      setError("이미 존재하는 아이디입니다.");
      return;
    }

    storedUsers.push({ username, password });
    localStorage.setItem("users", JSON.stringify(storedUsers));
    navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입페이지</h2>
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
      <button type="submit">회원가입</button>
    </form>
  );
}

export default SignupPage;
