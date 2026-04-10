import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PostLists() {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    // Sử dụng link API CodeSandbox của bạn thay vì localhost
    fetch("https://nhwxn9-8080.csb.app/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  return (
    <ul>
      {Object.entries(posts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
