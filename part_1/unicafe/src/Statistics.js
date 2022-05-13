import React from "react";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = good - bad;
  const positive = (good / total) * 100;

  if (total === 0)
    return (
      <div className="noInfo">
        <p>No Feedback Given</p>
      </div>
    );
  else
    return (
      <div className="Statistics">
        <section className="Statistics__wrapper">
          <h2>Statistics</h2>
          <div className="Statistics__info">
            <p>Good : {good}</p>
            <p>Neutral : {neutral}</p>
            <p>Bad : {bad}</p>
            <p>Total: {total}</p>
            <p>Average : {average}</p>
            <p>
              Positive : {positive} {"%"}
            </p>
          </div>
        </section>
      </div>
    );
};

export default Statistics;
