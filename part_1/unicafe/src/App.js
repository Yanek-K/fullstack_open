import "./App.css";

import { useState } from "react";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Give Feedback</h1>
      </header>
      <section className="Buttons">
        <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button>
      </section>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
