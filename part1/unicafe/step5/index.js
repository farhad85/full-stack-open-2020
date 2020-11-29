import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Statistics from './components/Statistics';
import Button from './components/Button';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button setFn={setGood}>good</Button>
      <Button setFn={setNeutral}>neutral</Button>
      <Button setFn={setBad}>bad</Button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root')
);