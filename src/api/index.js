import shortid from 'short-id';

let todos = [];

// 获取待办事项列表
export function getTodos () {
  return todos
}
// 添加代办项
export function newTodo(title) {
  todos.push({
    id: shortid.generate(),
    title: title,
    completed: false
  });
}
// 删除代办项
export function removeTodo(id) {
  const targetIndex = todos.findIndex(item => item.id === id);
  todos.splice(targetIndex, 1);
}
// 修改代办项
export function updateTodo(id, title) {
  const targetIndex = todos.findIndex(item => item.id === id);
  todos[targetIndex].title = title;
}
export function clearCompletedTodos() {
  todos = todos.filter(item => !item.completed);
}
export function toggleTodo(id) {
  const targetIndex = todos.findIndex(item => item.id === id);
  todos[targetIndex].completed = !todos[targetIndex].completed;
}
