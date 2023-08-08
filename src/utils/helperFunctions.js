export const generateRandomNumber = () =>
  Math.random().toString().split(".")[1];
export const setLocalStorage = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));
