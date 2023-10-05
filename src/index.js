import { createStore } from "redux";

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
add.addEventListener("click", () => countStore.dispatch({type: ADD})); // actions must be plain objects, actions must have a type
minus.addEventListener("click", () => countStore.dispatch({type: MINUS}));
