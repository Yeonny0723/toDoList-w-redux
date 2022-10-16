import {createAction, createReducer, configureStore, createSlice} from "@reduxjs/toolkit";


const addToDo = createAction("ADD"); // createAction(<<type>>)
const deleteToDo = createAction("DELETE");

let toDos_LS = JSON.parse(localStorage.getItem("toDos"))

/** Actions 생성
const reducer = (state = toDos_LS, action) => {
  // action.type: ADD | DELETE 위에서 정의한
  // action.payload: 받아온 인풋값
  switch (action.type) {
    case addToDo.type: // "ADD"
      return [{ text: action.payload, id: Date.now() }, ...state];
    case addToDo.type: // "DELETE"
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};
 */

/** Reducer 생성
const reducer = createReducer(toDos_LS, {
  // action.payload의 새로운 값을 state에 추가 저장
  // createReducer는 state를 mutate(push, pop, unshift...)해도 괜찮음
  [addToDo]: (state, action) => {
    state.unshift({ text: action.payload, id: Date.now() }); // unshift: 맨 앞 추가
  },
  [deleteToDo]: (state, action) =>
    state.filter(toDo => toDo.id !== action.payload)
});
 */

const toDos = createSlice({
  name: "reducer",
  initialState: toDos_LS,
  reducers:{
    add: (state, action) => {
      state.unshift({ text: action.payload, id: Date.now() });
    }, // key with only lowercase
    remove: (state, action) =>
    state.filter(toDo => toDo.id !== action.payload)
  }
})


export const { add, remove } = toDos.actions;

const store = configureStore({reducer: toDos.reducer});



export default store;