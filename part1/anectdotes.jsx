import { useState } from "react";

const getRandomArbitrary = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
};

const Winner = ({ anecdotes, allVotes }) => {
  const highestVoteCount = Math.max(...allVotes);

  if (highestVoteCount === 0) {
    return <p>No votes yet</p>;
  }

  const indexOfWinner = allVotes.indexOf(highestVoteCount);
  const winner = anecdotes[indexOfWinner];
  return (
    <div>
      <p>{winner}</p>
      <p>has {highestVoteCount} votes</p>
    </div>
  );
};

const Anectdotes = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well."
  ];

  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState(Array(6).fill(0));

  const handleNextClick = () => {
    const newIndex = getRandomArbitrary(0, anecdotes.length - 1);
    setSelected(newIndex);
  };

  const handleVoteClick = () => {
    const newAllVotes = [...allVotes];
    newAllVotes[selected] += 1;
    setAllVotes(newAllVotes);
  };

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {allVotes[selected]} votes</div>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextClick}>next anecdote</button>
      <h2>Most wins</h2>
      <Winner anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  );
};

export default Anectdotes;
