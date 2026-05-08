import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  // Add comment form
  const [newComment, setNewComment] = useState({ author: "", content: "" });
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  // Edit comment
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editError, setEditError] = useState("");

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
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while fetching the post.");
      }
    };
    fetchData();
  }, [slug]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    setAddError("");
    setAddSuccess("");
    if (!newComment.author.trim() || !newComment.content.trim()) {
      setAddError("Vui lòng điền đầy đủ tên và nội dung.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/api/post/${slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (!response.ok) {
        setAddError("Thêm comment thất bại.");
        return;
      }
      const added = await response.json();
      setPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), added],
      }));
      setNewComment({ author: "", content: "" });
      setAddSuccess("Comment đã được thêm!");
      setTimeout(() => setAddSuccess(""), 3000);
    } catch (err) {
      console.error("Error adding comment:", err);
      setAddError("Lỗi kết nối server.");
    }
  };

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditContent(comment.content);
    setEditError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
    setEditError("");
  };

  const handleEditComment = async (commentId) => {
    setEditError("");
    if (!editContent.trim()) {
      setEditError("Nội dung không được để trống.");
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE}/api/post/${slug}/comment/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editContent }),
        }
      );
      if (!response.ok) {
        setEditError("Sửa comment thất bại.");
        return;
      }
      const updated = await response.json();
      setPost((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c._id === commentId ? { ...c, content: updated.content } : c
        ),
      }));
      setEditingId(null);
      setEditContent("");
    } catch (err) {
      console.error("Error editing comment:", err);
      setEditError("Lỗi kết nối server.");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  const { title, description, comments = [] } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>

      <hr />
      <h4>Comments ({comments.length})</h4>

      {/* Danh sách comments */}
      {comments.length === 0 ? (
        <p style={{ color: "#888" }}>Chưa có comment nào.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {comments.map((c) => (
            <li
              key={c._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 6,
                padding: 10,
                marginBottom: 10,
              }}
            >
              <strong>{c.author}</strong>
              <span style={{ color: "#aaa", fontSize: 12, marginLeft: 8 }}>
                {new Date(c.createdAt).toLocaleString("vi-VN")}
              </span>

              {editingId === c._id ? (
                <div style={{ marginTop: 6 }}>
                  <textarea
                    rows={3}
                    style={{ width: "100%", boxSizing: "border-box" }}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  {editError && (
                    <p style={{ color: "red", margin: "4px 0" }}>{editError}</p>
                  )}
                  <button
                    onClick={() => handleEditComment(c._id)}
                    style={{ marginRight: 6 }}
                  >
                    Lưu
                  </button>
                  <button onClick={cancelEdit}>Hủy</button>
                </div>
              ) : (
                <div style={{ marginTop: 6 }}>
                  <p style={{ margin: "4px 0" }}>{c.content}</p>
                  <button onClick={() => startEdit(c)}>Sửa</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Form thêm comment */}
      <h4>Thêm comment</h4>
      <form onSubmit={handleAddComment}>
        <div>
          <span>Tên:</span>
          <br />
          <input
            type="text"
            value={newComment.author}
            onChange={(e) =>
              setNewComment({ ...newComment, author: e.target.value })
            }
            style={{ width: "100%", boxSizing: "border-box", marginBottom: 6 }}
          />
        </div>
        <div>
          <span>Nội dung:</span>
          <br />
          <textarea
            rows={3}
            value={newComment.content}
            onChange={(e) =>
              setNewComment({ ...newComment, content: e.target.value })
            }
            style={{ width: "100%", boxSizing: "border-box", marginBottom: 6 }}
          />
        </div>
        {addError && <p style={{ color: "red", margin: "4px 0" }}>{addError}</p>}
        {addSuccess && (
          <p style={{ color: "green", margin: "4px 0" }}>{addSuccess}</p>
        )}
        <button type="submit">Gửi comment</button>
      </form>
    </div>
  );
}
