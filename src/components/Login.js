import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const navigate = useNavigate();

  function handleLogin() {
    // Chỉ dùng để demo [cite: 272]
    if (creds.username === "admin" && creds.password === "123") {
      onLogin && onLogin({ username: creds.username });
      navigate("/stats");
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  }

  return (
    <div style={{ padding: 10 }}>
      <br />
      <span>Username:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />
      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
