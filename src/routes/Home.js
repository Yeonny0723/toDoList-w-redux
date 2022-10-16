import {useState, useEffect} from "react";
import {connect} from "react-redux";
import { add } from "../store";
import ToDo from "../components/ToDo";

const Home = ({ toDos, addToDo }) => {
    const [text, setText] = useState("");

    useEffect(()=>{
      localStorage.setItem("toDos", JSON.stringify(toDos))
    },[toDos]);

    function onChange(e) {
      setText(e.target.value);
    }
    function onSubmit(e) {
      e.preventDefault();
      addToDo(text);
      setText("");
    }
    return (
      <>
        <h1>To Do</h1>
        <form onSubmit={onSubmit}>
          <input type="text" value={text} onChange={onChange} />
          <button>Add</button>
        </form>
        <ul>
        {toDos.map(toDo => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
      </>
    );
}


const mapStateToProps = (state) => {
  // 유저가 컴포넌트에서 toDos를 입력하면 state를 출력
    return {toDos : state};
}

const mapDispatchToProps = (dispatch) => {
  // 유저가 컴포넌트에서 addToDo를 입력하면 디스패치함수 출력
    return {
        addToDo: (text) => dispatch(add(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);