import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function getRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Anecdote = ({ index, votes, anecdotes }) => {

  return (
    <>
      <p>{anecdotes[index]}</p>
      <p>has {votes[index] ?? 0} votes</p>
    </>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const maxVotes = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b, 0);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <button onClick={() => setSelected(getRandomNumber(anecdotes.length))}>next anecdote</button>
      <button onClick={() => setVotes(x => ({ ...x, [selected]: (x[selected] ?? 0) + 1 }))}>vote</button>
      <br />
      <Anecdote anecdotes={anecdotes} votes={votes} index={selected} />

      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} votes={votes} index={maxVotes} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);