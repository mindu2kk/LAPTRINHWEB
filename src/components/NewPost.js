import { useState } from "react";

const API_BASE = "http://localhost:8080";

function NewPost() {
  const [newPost, setNewPost] = useState("");
  const [form, setForm] = useState({ slug: "", title: "", description: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.slug) errs.slug = true;
    if (!form.title) errs.title = true;
    if (!form.description) errs.description = true;
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const post = JSON.stringify(form);
    try {
      const response = await fetch(`${API_BASE}/api/post`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: post,
      });
      if (response.ok) setNewPost("Post created successfully!");
      else setNewPost("Post created failed!");
    } catch (error) {
      console.error("Error creating data:", error);
      setNewPost("Post created failed!");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{ padding: 10 }}>
        <br />
        <span>Slug:</span>
        <br />
        <input
          type="text"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <br />
        {errors.slug && <div style={{ color: "red" }}>Slug is required</div>}
        <span>Title:</span>
        <br />
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <br />
        {errors.title && <div style={{ color: "red" }}>Title is required</div>}
        <span>Description:</span>
        <br />
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <br />
        {errors.description && (
          <div style={{ color: "red" }}>Description is required</div>
        )}
        <br />
        <button type="submit">Add New</button>
        <p style={{ color: "green" }}>{newPost}</p>
      </div>
    </form>
  );
}

export default NewPost;
