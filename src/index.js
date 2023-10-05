import { createStore } from "redux";

// Counter
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

number.innerText = 0;

const countModifier = (count = 0, action) => { // Ruducer: modify data, return data(state) of application
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
}; 
const countStore = createStore(countModifier); // Store data, It is required reducer

const onChange = () => {
  number.innerText = countStore.getState();
}
countStore.subscribe(onChange); // Able to know the changes in the store

// Send a message to reducer to communicate by using action
add.addEventListener("click", () => countStore.dispatch({ type: ADD })); // actions must be plain objects, actions must have a type
minus.addEventListener("click", () => countStore.dispatch({ type: MINUS }));


// To Dos
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE TODO";

const addToDo = (text) => { // addToDo's action
  return {
    type: ADD_TODO, 
    text
  }
}

const deleteToDo = (id) => { // deleteToDo's action
  return {
    type: DELETE_TODO,
    id
  }
}

const todoModifier = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state]; // Do not mutate state, Return a new state
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== action.id); // Filter returns a new array, so the filter is allowed to use here
      return cleaned;
    default:
      return state;
  }
};
const todoStore = createStore(todoModifier);

const dispatchAddToDo = (text) => {
  todoStore.dispatch(addToDo(text));
}

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch(deleteToDo(id));
}

const paintToDos = () => {
  const toDos = todoStore.getState();
  ul.innerHTML = "";

  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);

    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

todoStore.subscribe(paintToDos);

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);

