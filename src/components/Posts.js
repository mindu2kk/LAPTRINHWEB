import React from "react";
import { Outlet, Link } from "react-router-dom";

function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      <Link to="/posts/new">New Post</Link>
      <Outlet />
    </div>
  );
}

export default Posts;
