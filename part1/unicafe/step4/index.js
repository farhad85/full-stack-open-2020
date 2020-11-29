import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const score = {
  good: 1,
  neutral: 0,
  bad: -1,
};

const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad;
  const average = (good * score.good + neutral * score.neutral + bad * score.bad) / all || 0;
  const positive = good * 100 / all || 0;

  return (
    <>
      <h1>statistic</h1>

      {!good && !neutral && !bad ?
        <h2>No feedback given</h2> : (
          <>
            <p>good: {good}</p>
            <p>neutral: {neutral}</p>
            <p>bad: {bad}</p>

            <br />

            <p>all: {all}</p>
            <p>average: {average}</p>
            <p>positive: {positive} %</p>
          </>
        )}
    </>);
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(x => x + 1)}>good</button>
      <button onClick={() => setNeutral(x => x + 1)}>neutral</button>
      <button onClick={() => setBad(x => x + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root')
);