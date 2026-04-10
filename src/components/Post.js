import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_BASE = "http://localhost:8080";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/post/${slug}`);
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [slug]);

  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
