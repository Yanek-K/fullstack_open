import "./styles.css";

import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Give Feedback</h1>
      </header>
      <Button setFeedback={handleGood} text="Good" />
      <Button setFeedback={handleNeutral} text="Neutral" />
      <Button setFeedback={handleBad} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
