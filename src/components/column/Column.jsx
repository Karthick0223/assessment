import React from "react";
import Task from "../task/Task";
import "./Column.scss";
import { useDrop } from "react-dnd";
import { setLocalStorage } from "../../utils/helperFunctions";

const Column = ({ tasks, setTasks, column }) => {
  const { columnName, color } = column;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item) => {
      const tempTasks = JSON.parse(localStorage.getItem("tasks")) || [...tasks];
      const draggedTask = tempTasks.find((t) => t.id === item.id);
      draggedTask.status = columnName;
      setLocalStorage(tempTasks);
      setTasks(tempTasks);
    },
  }));
  return (
    <div className="columnContainer" ref={drop}>
      <div
        className="columnLabelContainer"
        style={{
          backgroundColor: color,
          boxShadow: isOver ? `0 0 20px ${color}` : "",
        }}
      >
        <h4>{columnName.toUpperCase()}</h4>
      </div>
      {tasks?.length ? (
        <>
          {tasks
            ?.filter((t) => t.status === columnName)
            .map((d) => (
              <Task task={d} key={d.id} tasks={tasks} setTasks={setTasks} />
            ))}
        </>
      ) : null}
    </div>
  );
};

export default Column;
