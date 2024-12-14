<script lang="ts">
import { defineComponent, InputHTMLAttributes } from 'vue'
import store from '../store';


export default defineComponent({
  setup() {
    return {
      store
    }
  },
  name: 'LoginForm',
  methods: {
    async onClick() {
      const { dispatch } = store;
      await dispatch('validateLogin')
      await dispatch('fetchLogin');
    },
    onChange(e: InputHTMLAttributes) {
      const { commit } = store;
      const { id: field, value } = e.target;
      commit('setFields', { field, value });
    }
  },

  computed: {
    errors() {
      const { state: { frontHandler: { isValidField: { email, password } } } } = store;
      const errors = [];
      if (!email) errors.push('Email invalido');
      if (!password) errors.push('Senha invalida, minimo 6 caracteres');
      return errors;
    }
  }

})
</script>

<template>
  <div class="container">
    <h1>Login is logged: {{ store.state.frontHandler.isLogged }}</h1>

    <form>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" @change="onChange" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" @change="onChange" />
      </div>
      <button type='button' @click="onClick">Login</button>
    </form>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </div>
</template>
