import React, { useMemo, useState } from "react";
import "./AddNewTask.scss";
import {
  generateRandomNumber,
  setLocalStorage,
} from "../../utils/helperFunctions";
const AddNewTask = ({ columnName, setOpen, setTasks, tasks }) => {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [newTaskDetails, setNewTaskDetails] = useState({
    title: "",
    desc: "",
    deadline: today,
    status: columnName,
    isCompleted: false,
    isFavourite: false,
  });
  const handleChange = (e) => {
    setNewTaskDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCreateNewTask = () => {
    const tempTasks = [...tasks];
    tempTasks.push({ ...newTaskDetails, id: generateRandomNumber() });
    setTasks(tempTasks);
    setLocalStorage(tempTasks);
    setNewTaskDetails({
      title: "",
      desc: "",
      deadline: new Date(today),
      status: columnName,
      isCompleted: false,
      isFavourite: false,
    });
    setOpen((prev) => !prev);
  };
  return (
    <section className="addNewTask">
      <article>
        <h3>Create New Task</h3>
        <div>
          <label>Title</label>
          <input
            type="text"
            maxLength={25}
            value={newTaskDetails.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            rows={4}
            maxLength={100}
            value={newTaskDetails.desc}
            name="desc"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Deadline</label>
          <input
            type="date"
            min={today}
            value={newTaskDetails.deadline}
            name="deadline"
            onChange={handleChange}
          />
        </div>
        <button
          disabled={
            !newTaskDetails.title ||
            !newTaskDetails.desc ||
            !newTaskDetails.deadline
          }
          onClick={handleCreateNewTask}
        >
          Create
        </button>
      </article>
    </section>
  );
};

export default AddNewTask;
