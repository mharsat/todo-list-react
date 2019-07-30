import axios from "axios";

const baseURL = "http://localhost:4000/tasks";

const Response = (data, error) => ({ data, error });

export async function getTasks() {
  let tasks = [];
  let error = "";
  await new Promise(resolve => setTimeout(resolve, 2000));
  try {
    const res = await axios.get(`${baseURL}/`);
    tasks = res.data;
  } catch {
    error = "Tasks not found in DB!";
  }
  return Response(tasks, error);
}

export async function addTask(newTask) {
  let error = "";
  try {
    await axios.post(`${baseURL}/add`, newTask);
  } catch {
    error = `Adding new task "${newTask.title}" failed`;
  }
  return error;
}

export async function removeCompletedTasks() {
  let error = "";
  try {
    await axios.post(`${baseURL}/remove`, { isDone: true });
  } catch {
    error = "Removing completed tasks failed";
  }
  return error;
}

export async function removeTask(taskId) {
  let error = "";
  try {
    await axios.post(`${baseURL}/remove/${taskId}`);
  } catch {
    error = "Failed to remove task";
  }
  return error;
}

export async function updateTask(taskId, updatedTask) {
  let error = "";
  try {
    await axios.post(`${baseURL}/update/${taskId}`, updatedTask);
  } catch {
    error = "Failed to update task";
  }
  return error;
}
