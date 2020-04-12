import axios from 'axios';
import shortid from 'short-id';

const request = axios.create({
  baseURL: 'http://localhost:3000'
});

// 获取待办事项列表
export async function getTodos() {
  const todos = await request.get('/todos').then(res => res.data);
  return todos;
}
// 添加代办项
export function newTodo(title) {
  return request.post('/todos', {
    id: shortid.generate(),
    title: title,
    completed: false
  });
}
// 删除代办项
export function removeTodo(id) {
  return request.delete('/todos/' + id);
}
// 修改代办项
export function updateTodo(id, title) {
  return request.patch('/todos/' + id, {
    title
  });
}
export async function clearCompletedTodos() {
  // todos = todos.filter(item => !item.completed);
  const todosList = await request.get('/todos').then(res => res.data);
  const deleteProcess = todosList
    .filter(todo => todo.completed)
    .map(todo => {
      const id = todo.id;
      return removeTodo(id);
    });
  return Promise.all(deleteProcess);
}
export async function toggleTodo(id) {
  const targetTodo = await request.get('todos/' + id).then(res => res.data)
  const completed = targetTodo.completed;

  return request.patch('todos/' + id, {
    completed: !completed
  });
}
