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
        @click="toggleTodo(item.id)"
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
import shortid from 'short-id';
export default {
  data() {
    return {
      todos: [
        {
          id: '001',
          title: 'aaa',
          completed: false,
        }
      ],
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
  methods: {
    // 添加代办项
    newTodo(title) {
      this.todos.push({
        id: shortid.generate(),
        title: title,
        completed: false
      })
    },
    // 删除代办项
    removeTodo(id) {
      const targetIndex = this.todos.findIndex(item => item.id === id);
      this.todos.splice(targetIndex, 1);
    },
    // 修改代办项
    updateTodo(id, title) {
      const targetIndex = this.todos.findIndex(item => item.id === id);
      this.todos[targetIndex].title = title;
    },
    handleNewTodo() {
      if (this.newTodoTitle) {
        this.newTodo(this.newTodoTitle);
        this.newTodoTitle = ''
      }
    },
    handleRemoveTodoClick(id) {
      this.removeTodo(id)
    },
    async handleTodoTitleClick(id, title) {
      this.curTodoId = id;
      this.editTodoTitle = title;
      await this.$nextTick();
      console.log(this.$refs)
      this.$refs[`inputRef-${id}`][0].focus()
    },
    handleEditTodoTitle(id) {
      this.updateTodo(id, this.editTodoTitle);
      this.curTodoId = null
    },
    toggleTodo(id) {
      const targetIndex = this.todos.findIndex((item) => item.id === id);
      this.todos[targetIndex].completed = !this.todos[targetIndex].completed;
    },

    handleClearCompletedTodos() {
      this.todos = this.todos.filter(item => !item.completed)
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
