import axios from "axios";

const baseURL = "http://localhost:4000/tasks";

export async function getTasks() {
  let tasks = [];
  const res = await axios.get(`${baseURL}/`);
  if (res.data) {
    tasks = res.data;
  } else console.error(res.data);
  return tasks;
}

export async function addTask(newTask) {
  const res = await axios.post(`${baseURL}/add`, newTask);
  console.log(res.data);
}

export async function removeCompletedTasks() {
  const res = await axios.post(`${baseURL}/remove`, { isDone: true });
  console.log(res.data);
}

export async function removeTask(taskId) {
  const res = await axios.post(`${baseURL}/remove/${taskId}`);
  console.log(res.data);
}

export async function updateTask(taskId, updatedTask) {
  const res = await axios.post(`${baseURL}/update/${taskId}`, updatedTask);
  console.log(res.data);
}
