<template lang="pug">
  .todos-container
    .title-container
      .title
        h1.title-name Hey {{ name }}!
        .title-message
          h2 things to do
          i.fal.fa-clipboard-list
      button.sign-out(@click="logOut" title="Log Out")
        i.fal.fa-sign-out
    span.error(v-if="error")
        i.far.fa-exclamation-circle
        | {{ error }}
    form.mobile(@submit.prevent="addTodo")
      input.mobile-input-todo(
        placeholder="Time to adult... What needs to be done?"
        v-model="newTodo"
      )
      button.button-mobile(type="submit") Add To Do
    input.input-todo(
      placeholder="Time to adult... What needs to be done?"
      v-model="newTodo"
      @keyup.enter="addTodo"
      @blur="addTodo"
      title="Enter To Do Deets"
    )
    ul.list
      li.list-item(v-for="todo in todos" :key="todo.id" :todo="todo")
        div.todo(v-show="todo !== editedTodo" @dblclick="editTodo(todo)")
          label {{ todo.task }}
          span.icons
            i.fal.fa-pencil(@click="editTodo(todo)" title="Edit To Do")
            i.fal.fa-trash-alt(@click="deleteTodo(todo)" title="Delete To Do")
        div.edit(v-show="todo === editedTodo")
          input.input-edit(
            v-todo-focus
            @blur="updateTodo(todo)"
            @keyup.enter="updateTodo(todo)"
            v-model="todo.task"
          )
</template>

<script>
import JwtDecode from 'vue-jwt-decode'

export default {
  name: 'todos',
    data() {
    return {
      name: '',
      todos: [],
      newTodo: '',
      error: '',
      editedTodo: ''
    }
  },
  created() {
    let token = this.$cookie.get('jwt')
    let decodedToken = JwtDecode.decode(token)
    this.name = decodedToken.first_name

    this.axios.wrapper.get('/todos')
      .then(response => { this.todos = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  updated() {
    let token = this.$cookie.get('jwt')
    if (!token) {
      this.$router.replace({ name: 'login' })
    }
  },
  methods: {
    setError() {
      this.error = "Something is afoot"
    },
    addTodo() {
      if (!this.newTodo) {
        return
      }
      this.axios.wrapper.post('/todos', { todo: { task: this.newTodo } })
      .then(response => {
        this.todos.push(response.data)
        this.newTodo = ''
      })
      .catch(error => this.setError(error, 'Cannot create To Do'))
    },
    deleteTodo(todo) {
      this.axios.wrapper.delete(`/todos/${todo.id}`)
        .catch(error => this.setError(error, 'Cannot delete To Do, you must do it again!'))
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    editTodo(todo) {
      this.editedTodo = todo
    },
    updateTodo(todo) {
      this.editedTodo = ''
      this.axios.wrapper.put(`/todos/${todo.id}`, { todo: { task: todo.task } })
        .catch(error => this.setError(error, 'Cannot update To Do'))
    },
    logOut() {
      this.$cookie.delete('jwt')
      this.$router.replace({name: 'login'})
    }
  },
  directives: {
    'todo-focus': function (el) {
      el.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.todos-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #0f0f0f;
  width: 75%;
  margin: 30px auto 0 auto;

  .error {
    color: #ff4444;
  }

  .fa-exclamation-circle {
    margin-right: 5px;
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .sign-out {
      font-size: 20px;
      color: #42b983;
      margin: 0;
      border: none;
      height: 22px;
      background: transparent;
      padding: 2px;
      cursor: pointer;
    }

    .sign-out:hover {
      color: #2c3e50;
    }

    .title {
      display: flex;
      flex-direction: column;

      .title-name {
        margin: 0 0 10px 0;
        padding: 0;
        font-weight: 100;
      }

      .title-message {
        display: flex;

        h2 {
          margin: 0 0 20px 0;
          font-weight: 200;
          font-size: 30px;
        }

        .fa-clipboard-list {
          font-size: 34px;
          margin-left: 7px;
          color: #42b983;
        }
      }
    }
  }

  .mobile {
    width: 100%;

    .mobile-input-todo {
      padding: 10px 0;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-top: 20px;
      color: #42b983;
      font-size: 16px;
      width: 100%;
      text-indent: 7px;
    }

    .mobile-input-todo::placeholder {
      color: #aaa;
    }

    .button-mobile {
    width: 100%;
    margin: 10px 0 0 0;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 16px;
    background-color: #42b983;
    color: #fff;
    cursor: pointer;
    }

    .button-mobile:hover {
      background-color: #2c3e50;
    }
  }

  .input-todo {
    padding: 10px 0;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-top: 20px;
    color: #42b983;
    font-size: 16px;
    width: 100%;
    text-indent: 7px;
  }

  .input-todo::placeholder {
    color: #aaa;
  }

  ul {
    margin: 20px 0 0 0;
    padding: 0;
    width: 100%;

    .list-item {
      list-style-type: none;
      cursor: pointer;
      margin: 15px 0;

      label {
        cursor: pointer;
      }

      .input-edit {
        width: 100%;
        padding: 5px 0;
        border-radius: 4px;
        border: 1px solid #ccc;
        color: #42b983;
        font-size: 16px;
        text-indent: 7px;
      }
    }

    .icons {
      visibility: hidden;

      .fa-pencil {
        color: #42b983;
        margin-right: 20px;
      }

      .fa-pencil:hover {
        color: #2c3e50;
      }

      .fa-trash-alt {
        color: #ff4444;
      }

      .fa-trash-alt:hover {
        color: #932727;
      }
    }

    .list-item:hover .icons {
      visibility: visible;
    }

    .todo {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #42b98360;
      padding-bottom: 3px;
    }
  }
}

@media(max-width: 450px) {
  .todos-container {
    width: 90%;

    .title-container {
      .title {
        h2 {
          font-size: 28px;
        }

        .fa-clipboard-list {
          font-size: 32px;
        }
      } 
    }

    .input-todo {
      display: none;
    }
  
    ul .icons {
      visibility: visible;

      .fa-pencil {
        margin-right: 10px;
      }
    }
  }
}

@media(min-width: 451px) {
  .todos-container{
    .mobile {
      display: none;
    }
  }
}

@media(min-width: 1100px) {
  .todos-container {
    width: 820px;
  }
}
</style>


