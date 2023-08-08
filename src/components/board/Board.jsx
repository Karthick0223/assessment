import React from "react";
import "./Board.scss";
import Column from "../column/Column";
const Board = ({ tasks, setTasks, column }) => {
  return (
    <section className="board">
      {column?.map((c, i) => (
        <Column tasks={tasks} setTasks={setTasks} column={c} key={i} />
      ))}
    </section>
  );
};

export default Board;
