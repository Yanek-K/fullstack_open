import React from 'react';

const Notification = ({ notificationMessage }) => {
  const { text, type } = notificationMessage;

  if (text === null) {
    return null;
  }
  return <div className={type === 'error' ? 'error' : 'success'}>{text}</div>;
};

export default Notification;
