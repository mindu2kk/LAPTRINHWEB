import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { BlogPosts } from "../data";

export function Posts() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Blog</h2>
      <Outlet />
    </div>
  );
}

export function PostLists() {
  return (
    <ul>
      {Object.entries(BlogPosts).map(([slug, { title }]) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Post() {
  const { slug } = useParams();
  const post = BlogPosts[slug];

  if (!post) {
    return <span>The blog post you've requested doesn't exist.</span>;
  }

  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
