import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Truyền slug động vào link API CodeSandbox của bạn
    fetch(`https://nhwxn9-8080.csb.app/api/posts/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setPost(null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <span>Loading post details...</span>;
  }

  if (!post) {
    return <span>The blog post you've requested doesn't exist.</span>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </div>
  );
}
