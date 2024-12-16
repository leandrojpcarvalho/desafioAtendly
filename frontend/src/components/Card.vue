<script lang="ts">
import { defineComponent } from 'vue';
import store from '../store';

export default defineComponent({
  setup() {
    const { name } = store.state;
    return {
      name,
      store,
    };
  },
  name: 'CardSection',
});
</script>


<template>
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link active" aria-current="true" href="#">Dados</a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <h5 class="card-title">Informaçoes do usuario</h5>
      <p class="card-text">Id: {{ store.state.frontHandler.userInfo.id }}</p>
      <p class="card-text">Nome: {{ store.state.frontHandler.userInfo.name }}</p>
      <p class="card-text">Email: {{ store.state.frontHandler.userInfo.email }}</p>
    </div>
    <p>{{ name }}</p>
  </div>
</template>
