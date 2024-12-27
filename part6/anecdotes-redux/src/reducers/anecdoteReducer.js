import { createSlice, current } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = anecdote => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateVote(state, action) {
      // const foundA = state.find(a => a.id === action.payload);
      // const updatedA = { ...foundA, votes: foundA.votes + 1 };
      // return state.map(a => (a.id === foundA.id ? updatedA : a));
      return state.map(a => (a.id === action.payload.id ? action.payload : a));
    },
    addContent(state, action) {
      //state.push(asObject(action.payload));
      state.push(action.payload);
    }
  }
});

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdotes = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content);
    dispatch(addContent(newAnecdote));
  };
};

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.vote(anecdote);
    dispatch(updateVote(updatedAnecdote));
  };
};

export const { vote, addContent, setAnecdotes, updateVote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "VOTE":
//       const foundA = state.find(a => a.id === action.payload);
//       const updatedA = { ...foundA, votes: foundA.votes + 1 };
//       return state.map(a => (a.id === foundA.id ? updatedA : a));
//     case "ADD":
//       return state.concat(asObject(action.payload));
//     default:
//       return state;
//   }
// };

// export const vote = id => {
//   return {
//     type: "VOTE",
//     payload: id
//   };
// };

// export const addContent = content => {
//   return {
//     type: "ADD",
//     payload: content
//   };
// };

// export default anecdoteReducer;
