import React from "react";

const Button = ({ setFeedback, text }) => {
  return (
    <div className="Buttons">
      <button onClick={setFeedback}>{text}</button>
    </div>
  );
};

export default Button;
