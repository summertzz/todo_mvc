<template>
  <div id="app">
    <input
      type="text"
      v-model="newTodoTitle"
      autofocus
      @keyup.enter="handleNewTodo"
    >
    <div
      class="main"
      v-for="item in renderTodos"
      :key="item.id"
    >
      <input
        type="checkbox"
        :checked="item.completed"
        @click="handleToggleTodo(item.id)"
      >
      <span
        v-if="curTodoId !== item.id"
        @click="handleTodoTitleClick(item.id, item.title)"
      >{{item.title}}</span>
      <input
        type="text"
        v-else
        v-model="editTodoTitle"
        :ref="`inputRef-${item.id}`"
        @keyup.enter="handleEditTodoTitle(item.id)"
        @blur="handleHideEditTodo"
      >
      <button @click="handleRemoveTodoClick(item.id)">删除</button>
    </div>
    <div class="footer">
      <button> {{todosCount}}item left</button>
      <button @click="type ='all'">all</button>
      <button @click="type ='actived'">actived</button>
      <button @click="type ='completed'">completed</button>
      <button @click="handleClearCompletedTodos">clear completed</button>
    </div>
  </div>
</template>

<script>
import 'normalize.css';

import {
  getTodos,
  newTodo,
  removeTodo,
  updateTodo,
  clearCompletedTodos,
  toggleTodo} from './api/index.js';

export default {
  data() {
    return {
      todos: [],
      newTodoTitle: '',
      curTodoId: null,
      editTodoTitle: '',
      type: 'all'
    }
  },

  computed: {
    todosCount() {
      return this.todos.filter((item => !item.completed)).length;
    },
    renderTodos() {
      if (this.type === 'actived') {
        return this.todos.filter(item => !item.completed)
      }
      if (this.type === 'completed') {
        return this.todos.filter(item => item.completed)
      }
      return this.todos;
    }
  },

  async created() {
    this.todos = await getTodos()
  },

  methods: {
    async handleNewTodo() {
      if (this.newTodoTitle) {
        await newTodo(this.newTodoTitle);
        this.newTodoTitle = ''
        this.todos = await getTodos()
      }
    },
    async handleRemoveTodoClick(id) {
      await removeTodo(id)
      this.todos = await getTodos()
    },
    async handleTodoTitleClick(id, title) {
      this.curTodoId = id;
      this.editTodoTitle = title;
      await this.$nextTick();
      this.$refs[`inputRef-${id}`][0].focus()
    },
    async handleEditTodoTitle(id) {
      await updateTodo(id, this.editTodoTitle);
      this.curTodoId = null
      this.todos = await getTodos()
    },

    async handleToggleTodo(id) {
      await toggleTodo(id)
      this.todos = await getTodos()
    },

    async handleClearCompletedTodos() {
      await clearCompletedTodos();
      this.todos = await getTodos()
    },
    handleHideEditTodo() {
      this.curTodoId = null;
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  margin-right: 10px;
}
</style>
