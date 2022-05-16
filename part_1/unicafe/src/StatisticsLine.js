import React from "react";

const StatisticsLine = ({ text, value }) => {
  const positive = () => {
    return text === "Positive" ? "%" : "";
  };

  return (
    <div>
      <table className="StatisticsLine__table">
        <tbody>
          <tr>
            <td>{text}</td>
            <td>
              {value}
              {positive()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsLine;
