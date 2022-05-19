import React from "react";

const StatisticsLine = ({ text, value }) => {
  const isPositive = () => {
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
              {isPositive()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsLine;
