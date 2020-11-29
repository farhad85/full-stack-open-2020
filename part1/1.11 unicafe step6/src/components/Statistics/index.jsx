import React from "react";
import Statistic from "../Statistic";

const score = {
  good: 1,
  neutral: 0,
  bad: -1,
};

function Statistics({ good, neutral, bad }) {
  const all = good + neutral + bad;
  const average =
    (good * score.good + neutral * score.neutral + bad * score.bad) / all || 0;
  const positive = (good * 100) / all || 0;

  return (
    <>
      <h1>statistic</h1>

      {!good && !neutral && !bad ? (
        <h2>No feedback given</h2>
      ) : (
        <table>
          <tbody>
            <Statistic label="good" value={good} />
            <Statistic label="neutral" value={neutral} />
            <Statistic label="bad" value={bad} />
            <Statistic label="all" value={all} />
            <Statistic label="average" value={average} />
            <Statistic label="positive" value={positive} />
          </tbody>
        </table>
      )}
    </>
  );
}

export default Statistics;
