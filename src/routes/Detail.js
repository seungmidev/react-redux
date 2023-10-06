import React from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

function Detail({ toDos }) {
  const { id } = useParams();
  const toDo = toDos.find(toDo => toDo.id === parseInt(id));

  return (
    <div>
      <h1>{toDo?.text}</h1>
      <h2>Created at: {toDo?.id}</h2>
    </div>
  )
}

function mapStateToProps(state) {
  return { toDos: state };
}

export default connect(mapStateToProps)(Detail);
