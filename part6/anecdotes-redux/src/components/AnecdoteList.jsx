import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const byVotes = (b1, b2) => b2.votes - b1.votes;

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return anecdotes;
    const regex = new RegExp(filter, "i");
    return anecdotes.filter(anecdote => anecdote.content.match(regex));
  });

  const voteHandler = anecdote => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification("You voted for anecdote " + anecdote.id));
  };

  const dispatch = useDispatch();

  return [...anecdotes].sort(byVotes).map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteHandler(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
