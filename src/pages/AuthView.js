import React, { useState } from "react";
import { useNavigate, Navigate, Link, Outlet } from "react-router-dom";

export function Login({ onLogin }) {
  // ... (Giữ nguyên code hàm Login cũ) ...
}

export function UserStats() {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Có 100 người dùng</h3>
    </div>
  );
}

// 1. TẠO MỚI COMPONENT: StatsOverview (Giống hệt PostLists)
// Chứa nội dung mặc định khi vừa mới vào /stats
export function StatsOverview() {
  return (
    <div>
      <p>Đây là trang tổng quan Stats.</p>
      <Link
        to="userstats"
        style={{
          padding: "5px 10px",
          background: "#eee",
          border: "1px solid #ccc",
          textDecoration: "none",
          color: "black",
        }}
      >
        Xem chi tiết người dùng
      </Link>
    </div>
  );
}

// 2. SỬA LẠI COMPONENT: Stats (Giống hệt Posts)
// Chỉ đóng vai trò là cái khung (wrapper) chứa Outlet
export function Stats({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Stats View</h2>

      {/* Chỉ để lại Outlet ở đây. Khi ở /stats, nó hiện StatsOverview. Khi ở /stats/userstats, nó thay bằng UserStats */}
      <Outlet />
    </div>
  );
}
