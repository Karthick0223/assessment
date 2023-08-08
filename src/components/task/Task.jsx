import React from "react";
import "./Task.scss";
import { useDrag } from "react-dnd";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { setLocalStorage } from "../../utils/helperFunctions";
import { MdRemoveCircleOutline } from "react-icons/md";

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: task,
  }));

  const handleFav = () => {
    const tempTasks = [...tasks];
    tempTasks.map((t) => {
      if (t.id === task.id) {
        t.isFavourite = !t.isFavourite;
      }
      return t;
    });
    setLocalStorage(tempTasks);
    setTasks(tempTasks);
  };
  const handleRemoveTask = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const tempTasks = [...tasks];
    tempTasks.splice(
      tempTasks.findIndex((t) => t.id === task.id),
      1
    );
    setLocalStorage(tempTasks);
    setTasks(tempTasks);
  };
  return (
    <div className="task" ref={drag}>
      <div className="titleContainer">
        <label>{task?.title}</label>
        <button className="icon" title="Remove" onClick={handleRemoveTask}>
          <MdRemoveCircleOutline color="#be123c" />
        </button>
      </div>
      <p>{task?.desc}</p>

      <div className="bottom">
        <span className="deadline">Last Date :{task?.deadline}</span>
        <button
          className="favIcon"
          onClick={handleFav}
          title={task?.isFavourite ? "Remove From Favorite" : "Add to Favorite"}
        >
          {task?.isFavourite ? (
            <MdOutlineFavorite color="#be123c" />
          ) : (
            <MdOutlineFavoriteBorder />
          )}
        </button>
      </div>
    </div>
  );
};

export default Task;
