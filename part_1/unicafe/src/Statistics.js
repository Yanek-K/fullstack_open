import React from "react";
import StatisticsLine from "./StatisticsLine";

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
          <div>
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="Total" value={total} />
            <StatisticsLine text="Average" value={average} />
            <StatisticsLine text="Positive" value={positive} />
          </div>
        </section>
      </div>
    );
};

export default Statistics;
