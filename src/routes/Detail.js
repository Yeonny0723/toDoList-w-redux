import React from "react";
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';

function Detail({ toDos }) {
  let {id} = useParams();
  const toDo = toDos.find(toDo=> parseInt(toDo.id) === parseInt(id))
  
  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Created at: {toDo?.id}</h5>
    </>
  );
}

function mapStateToProps(state, ownProps) {
    return {toDos: state}
}

export default connect(mapStateToProps)(Detail);