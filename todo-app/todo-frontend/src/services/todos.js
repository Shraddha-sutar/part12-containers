import axios from "axios";

// Backend base URL via Nginx (/api)
const baseUrl = import.meta.env.VITE_BACKEND_URL + "/todos";

/**
 * Get all todos
 */
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

/**
 * Create a new todo
 */
const createTodo = async (newTodo) => {
  const response = await axios.post(baseUrl, newTodo);
  return response.data;
};

/**
 * Update an existing todo
 */
const updateTodo = async (id, updatedTodo) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedTodo);
  return response.data;
};

/**
 * Delete a todo
 */
const deleteTodo = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAll,
  createTodo,
  updateTodo,
  deleteTodo,
};
