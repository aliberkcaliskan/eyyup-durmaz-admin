import React from "react";

export default function UserCard({ user }) {
  return (
    <div className="flex flex-column align-items-center justify-content-center">
      <i className="pi pi-user" style={{ fontSize: "3rem" }}></i>
      <b>{user.fullName}</b>
      <span>{user.degree}</span>
    </div>
  );
}
