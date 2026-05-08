import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/post/${slug}`);
        if (!response.ok) {
          setError("Post not found.");
          return;
        }
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching the post.");
      }
    };
    fetchData();
  }, [slug]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
