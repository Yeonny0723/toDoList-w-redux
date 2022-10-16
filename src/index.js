/** Vanilla - Redux: To Do List */

import {createStore} from "redux";

// select html tags
const form = document.querySelector("form")
const input = document.querySelector("input")
const ul = document.querySelector("ul")

// initialize const to avoid typo
// 리팩토링 방법 중 하나: 확인하기
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";


/** Function to add inputted toDo */
const addToDo = toDo => {
  // dispatch: store에 메시지를 보내기
  store.dispatch(
    {
      type: ADD_TODO,
      text: toDo,
    }
  );
}

/** Function to delete clicked toDo by its id */
const deleteToDO = e => {
  const id = parseInt(e.target.parentNode.id);
  // dispatch: store에 메시지를 보내기
  store.dispatch(
    {
      type: DELETE_TODO,
      id,
    }
  );
}

/** function to paint all toDos from state */ 
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""
  toDos.forEach((toDo)=>{
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL"
    btn.addEventListener("click", deleteToDO);
    li.id = toDo.id
    li.innerText = toDo.text
    li.appendChild(btn)
    ul.appendChild(li);
  })
}

/** State modifier: this shouldn't mutate an array but return a new array */
// state를 modify할 수 있는 유일한 함수
// state를 리턴한다
// reducer와 communicate하기 위한 방법으로 2nd param인 action을 사용
const reducer = (state = [], action) => {
  switch (action.type){ // state 출력
    case ADD_TODO:
      // Date.now()로 id 아이디 부여
      return [{text: action.text, id: Date.now()}, ...state]
    case DELETE_TODO:
      // filter은 새로운 배열을 리턴한다. 
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state
  }
}

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = ""
  addToDo(toDo)
}

// initialize storage (to save state)
// state를 저장해놓은 저장소
const store = createStore(reducer);

form.addEventListener("submit", onSubmit)

// add event listener(subscribe) to storage and execute paintToDos
// subscribe는 store 내 변화를 알려줌
store.subscribe(
  paintToDos
)