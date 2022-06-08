import React from "react";
import "./index.css";

const Notification = ({ text, type }) => {
  if (text === null) {
    return null;
  }
  return (
    <div className={type === "error" ? "error" : "notification"}>{text}</div>
  );
};

export default Notification;
