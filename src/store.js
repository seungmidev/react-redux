import { configureStore, createSlice } from '@reduxjs/toolkit';

// use redux
/* const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text
  }
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id
  }
};

const reducer = (state = [], action) => {
  switch(action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter(toDo => toDo !== action.id);
    default:
      return state;
  }
} */


// use redux toolkit - createAction
/* const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.text, id: Date.now() });
  },
  [deleteToDo]: (state, action) => state.filter(toDo => toDo !== action.payload)
}); */

// use redux toolkit = createSlice
const toDos = createSlice({
  name: 'toDosReducer',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => state.filter(toDo => toDo.id !== action.payload)
  }
});

const store = configureStore({ reducer: toDos.reducer });

export const { add, remove } = toDos.actions;

/* export const actionCreators = {
  addToDo,
  deleteToDo
}*/

export default store;