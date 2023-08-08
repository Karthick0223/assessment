import Board from "./components/board/Board";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import AddNewTask from "./components/addNewTask/AddNewTask";
import { AiOutlinePlus } from "react-icons/ai";
import { useMemo, useState, useEffect } from "react";
import { generateRandomNumber } from "./utils/helperFunctions";
function App() {
  const [open, setOpen] = useState(false);
  const column = useMemo(
    () => [
      { columnName: "Todo", color: "#be123c" },
      { columnName: "Inprogress", color: "#f59e0b" },
      { columnName: "Done", color: "#65a30d" },
    ],
    []
  );
  const [tasks, setTasks] = useState([
    {
      id: generateRandomNumber(),
      title: "Learn React",
      desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quidem
        perferendis, soluta quas sapiente sed.`,
      deadline: new Date().toLocaleDateString(),
      status: column[0].columnName,
      isCompleted: false,
      isFavourite: false,
    },
    {
      id: generateRandomNumber(),
      title: "Learn Angular",
      desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quidem
        perferendis, soluta quas sapiente sed.`,
      deadline: new Date().toLocaleDateString(),
      status: column[1].columnName,
      isCompleted: false,
      isFavourite: false,
    },
    {
      id: generateRandomNumber(),
      title: "Learn Vue",
      desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quidem
        perferendis, soluta quas sapiente sed.`,
      deadline: new Date().toLocaleDateString(),
      status: column[2].columnName,
      isCompleted: false,
      isFavourite: false,
    },
  ]);
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (storedTasks?.length) {
      setTasks(storedTasks);
    }
  }, [tasks.length]);
  return (
    <main className="container">
      <DndProvider backend={HTML5Backend}>
        <section className="wrapper">
          <h1>React Todo Lists</h1>
          <Board tasks={tasks} setTasks={setTasks} column={column} />
        </section>
      </DndProvider>
      <button
        className="addIcon"
        title="Add New Todo"
        onClick={() => setOpen((prev) => !prev)}
      >
        <AiOutlinePlus />
      </button>
      {open ? (
        <AddNewTask
          setOpen={setOpen}
          columnName={column[0].columnName}
          setTasks={setTasks}
          tasks={tasks}
        />
      ) : null}
    </main>
  );
}

export default App;
