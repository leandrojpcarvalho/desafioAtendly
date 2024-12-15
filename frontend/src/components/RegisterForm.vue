<script lang="ts">
import { defineComponent, InputHTMLAttributes } from 'vue';
import store from '../store';

export default defineComponent({
  setup() {
    const { isLogged, isValidField } = store.state.frontHandler
    return {
      isLogged,
      isValidField,
    }
  },
  name: 'RegisterForm',
  methods: {
    async onClick() {
      const { dispatch } = store;
      await dispatch('validateRegister');
      await dispatch('fetchRegister');
    },
    onChange(e: InputHTMLAttributes) {
      const { commit } = store;
      //procurar type correto
      const element = e as unknown as { target: { id: string, value: string } }
      const { id: field, value } = element.target
      commit('setFields', { field, value });
    }
  },
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
        <input class="form-control" type="email" id="email" @change="onChange" required placeholder="seu@email.com"
          :class="{ 'is-valid': isValidField.email, 'is-invalid': isValidField.email !== undefined ? !isValidField.email : false }" />
        <div class="invalid-feedback">Email invalido</div>
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
        <button type='submit' @click="onClick"
          class="w-100  flex-grow-1 center btn btn-lg btn-primary btn-lg">Cadastrar</button>
      </div>
    </form>
  </main>
</template>
