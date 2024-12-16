<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes } from 'vue';
import store from '../store';

export default defineComponent({
  setup() {
    const { frontHandler } = store.state;
    const { isLogged, isValidField, loginError } = store.state.frontHandler

    const emailError = computed(() => {
      const { loginError } = store.state.frontHandler
      return loginError.includes("Email") ? loginError : 'Email invalido'
    })

    return {
      loginError,
      frontHandler,
      isLogged,
      isValidField,
      emailError
    }
  },
  name: 'RegisterForm',
  methods: {
    async onClick() {
      const { dispatch } = store;
      await dispatch('fetchRegister');
      console.log(store.state.frontHandler.isLogged)
      if (store.state.frontHandler.isLogged) {
        this.redirect();
      }
    },
    async validEmail() {
      const { dispatch } = store;
      await dispatch('fetchEmail');
    },
    redirect() {
      this.$router.push('/home');
    },
    onChange(e: InputHTMLAttributes) {
      const { commit } = store;
      //procurar type correto
      const element = e as unknown as { target: { id: string, value: string } }
      const { id: field, value } = element.target
      commit('setFields', { field, value });
    },
  },
  computed: {
    emailInvalid() {
      const { isValidField } = store.state.frontHandler

      return [isValidField.email, isValidField.email !== undefined ? !isValidField.email : false]
    }
  }
})
</script>

<template>
  <main class="form-signin container d-flex flex-column align-items-center">
    <form class="needs-validation width">
      <h1 class="h3- mb-3 fw-normal">Cadastro</h1>
      <hr class="my-4">
      <div class="col-sm-6 w-100">
        <label for="email">Nome</label>
        <input class="form-control" type="text" id="name" @change="onChange" required placeholder="John doe"
          :class="{ 'is-valid': isValidField.name, 'is-invalid': isValidField.name !== undefined ? !isValidField.name : false }" />
        <div class="invalid-feedback">Nome invalido, nome e sobrenome</div>
      </div>

      <div class="col-sm-6 w-100">
        <label for="email">Email</label>
        <input class="form-control" type="email" id="email" v-on:blur="validEmail" @change="onChange" required
          placeholder="seu@email.com" :class="{ 'is-valid': emailInvalid[0], 'is-invalid': emailInvalid[1] }" />
        <div class="invalid-feedback">{{ emailError }}</div>
      </div>
      <div class="col-sm-6 w-100">
        <label for="password">Password</label>
        <input class="form-control" type="password" id="password" @change="onChange" required
          :class="{ 'is-valid': isValidField.password, 'is-invalid': isValidField.password !== undefined ? !isValidField.password : false }" />
        <div class="invalid-feedback">Senha invalida, precisa ter no minimo 6 caracteres
        </div>
      </div>
      <hr class="my-4">
      <div class="d-flex gap-3">
        <RouterLink to="/" class=" center btn btn-lg bg-secondary text-white btn-lg">Entrar</RouterLink>
        <button class="w-100  flex-grow-1 center btn btn-lg btn-primary btn-lg" type="button" disabled
          v-if="frontHandler.isLoading">
          Cadastrando...
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
        <button type='button' @click="onClick" class="w-100  flex-grow-1 center btn btn-lg btn-primary btn-lg "
          v-if="!frontHandler.isLoading">Cadastrar</button>
      </div>
    </form>
  </main>
</template>
