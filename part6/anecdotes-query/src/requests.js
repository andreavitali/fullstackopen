import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then(res => res.data);

export const createAnecdote = async content => {
  const getId = () => (100000 * Math.random()).toFixed(0);
  const object = { content, id: getId(), votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

export const vote = async anecdote => {
  const updatedA = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedA);
  return response.data;
};
