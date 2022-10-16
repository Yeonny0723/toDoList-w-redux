import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = text => {
  return {
    type: ADD,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE,
    id: parseInt(id)
  };
};

let toDos_LS = JSON.parse(localStorage.getItem("toDos"))

const reducer = (state = toDos_LS, action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
    addToDo,
    deleteToDo
};

export default store;