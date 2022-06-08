import React from "react";
import "./../index.css";

const Notification = ({ notificationMessage }) => {
  const { text, type } = notificationMessage;

  if (text === null) {
    return null;
  }
  return (
    <div className={type === "error" ? "error" : "notification"}>{text}</div>
  );
};

export default Notification;
