<script lang="ts">
import { defineComponent, InputHTMLAttributes } from 'vue'
import store from '../store';


export default defineComponent({
  beforeMount() {
    if (store.state.frontHandler.isLogged) {
      this.$router.push('/home')
    }
  },
  setup() {
    const { frontHandler } = store.state;
    const { isValidField } = store.state.frontHandler
    const isError = () => frontHandler.loginError !== '';
    return {
      store,
      isValidField,
      frontHandler,
      isError
    }
  },
  name: 'LoginForm',
  methods: {
    async onClick() {
      const { dispatch } = store;
      await dispatch('validateLogin');
      await dispatch('fetchLogin');
      if (store.state.frontHandler.isLogged) {
        this.$router.push('/home')
      }
    },
    onChange(e: InputHTMLAttributes) {
      const { commit } = store;
      const element = e as unknown as { target: { id: string, value: string } }
      const { id: field, value } = element.target
      commit('setFields', { field, value });
    },
  },
})
</script>

<template>
  <main class="form-signin container d-flex flex-column align-items-center">
    <form class="needs-validation width">
      <h1 class="h3- mb-3 fw-normal">Login</h1>
      <hr class="my-4">
      <div class="col-sm-6 w-100">
        <label for="email">Email</label>
        <input class="form-control" type="email" id="email" @change="onChange" required placeholder="seu@email.com"
          :class="{ 'is-valid': isValidField.email, 'is-invalid': isValidField.email !== undefined ? !isValidField.email : false }"
          :value="store.state.email" />
        <div class="invalid-feedback">Email invalido</div>
      </div>
      <div class="col-sm-6 w-100">
        <label for="password">Password</label>
        <input class="form-control" type="password" id="password" @change="onChange" required
          :class="{ 'is-valid': isValidField.password, 'is-invalid': isValidField.password !== undefined ? !isValidField.password : false }"
          :value="store.state.password" />
        <div class="invalid-feedback">Senha invalida, precisa ter no minimo 6 caracteres
        </div>
      </div>
      <hr class="my-4">
      <div class="d-flex gap-3">
        <RouterLink to="/register" class=" center btn btn-lg bg-secondary text-white btn-lg">Cadastro</RouterLink>
        <button class="w-100  flex-grow-1 center btn btn-lg btn-primary btn-lg" type="button" disabled
          v-if="frontHandler.isLoading">
          Entrando...
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
        <button type='button' @click="onClick" class="w-100  flex-grow-1 center btn btn-lg btn-primary btn-lg "
          v-if="!frontHandler.isLoading">Entrar</button>
      </div>
    </form>
    <section>
      <p>{{ frontHandler.loginError }}</p>
    </section>
  </main>
</template>


<style>
.width {
  min-width: 350px;
}
</style>
