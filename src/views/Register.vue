<template lang="pug">
  .register-container
    form.form(@submit.prevent="register")
      header.header
        h1 Sign Up
        img.logo(src="../assets/logo.png")
      span.error(v-if="errors")
        i.far.fa-exclamation-circle
        | {{ errors }}
      .form-group
        label.label(for="firstName") First Name
        input.input(v-model="firstName" type="text" placeholder="Thor")
      .form-group
        label.label(for="lastName") Last Name
        input.input(v-model="lastName" type="text" placeholder="Odinson")
      .form-group
        label.label(for="email") Email
        input.input(v-model="email" type="email" placeholder="strongest_avenger@email.com")
      .form-group
        label.label(for="password") Password
        input.input(v-model="password" type="password" placeholder="password")
      .form-group
        label.label(for="passwordConfirmation") Confirm Password
        input.input(v-model="passwordConfirmation" type="password" placeholder="password")
      button.button(type="submit" title="Sign Up") Sign Up
      router-link(to="/" title="Log In") Log In
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: ''
    }
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('register', {
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation
        })
        this.$router.replace({ name: 'todos' })
      } catch (error) {
        this.errors = error.response.data.errors.join(', ')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  color: #0f0f0f;
  background: #13120030;
  background: linear-gradient(0deg, #2c3e50 0%, #42b983 100%);

  .header {
    display: flex;
    justify-content: space-between;

    .logo {
      height: 70px;
    }

    h1 {
      font-size: 28px;
      font-weight: 100;
    }
  }

  .error {
    color: #ff4444;
  }

  .fa-exclamation-circle {
    margin-right: 5px;
  }

  .form {
    width: 250px;
    height: 560px;
    margin-top: 25px;
    border-radius: 4px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0px 0px 5px 2px #13120050;

    .form-group {
      display: flex;
      flex-direction: column;
      margin: 10px 0;

      .input {
        padding: 7px;
        border-radius: 4px;
        border: 1px solid #ccc;
        margin-top: 2px;
        color: #42b983;
        font-size: 14px;
      }

      .input::placeholder {
        color: #bbb;
      }
    }
  }

  .button {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 16px;
    background-color: #42b983;
    color: #fff;
    cursor: pointer;
  }

  .button:hover {
    background-color: #2c3e50;
  }

  a {
    margin-top: 20px;
    text-decoration: none;
    color: #42b983;
    width: 60px;
  }

  a:hover {
    color: #2c3e50;
  }
}

@media (min-width: 600px) {
  .register-container {
    .form {
      width: 50%;
      margin-top: 100px;
    }
  }
}

@media (min-width: 1000px) {
  .register-container {
    .form {
      width: 500px;
      margin-top: 100px;
    }
  }
}
</style>
