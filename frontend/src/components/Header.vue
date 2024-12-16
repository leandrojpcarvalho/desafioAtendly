<script lang="ts">
import { defineComponent } from 'vue';
import store from '../store';

export default defineComponent({
  data() {
    const { name } = store.state.frontHandler.userInfo
    return {
      name
    }
  },
  name: 'HeaderSection',
  methods: {
    async logout() {
      this.$router.push('/')
      store.commit('setIsLogged', false)
      localStorage.removeItem('token')
    }
  },
})
</script>

<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <RouterLink to="/home" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          <span class="fs-4"><span class="styled">A</span>tendly</span>
        </RouterLink>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <RouterLink to="/home" class="nav-link px-2 link-dark">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/home" class="nav-link px-2 link-dark">Atendimento</RouterLink>
          </li>
        </ul>
        <div class="dropdown text-end">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img src="../assets/settings_16932722.png" alt="mdo" width="32" height="32" class="rounded-circle">
          </a>
          <ul class="dropdown-menu text-small">
            <li>
              <RouterLink to="/profile" class="dropdown-item">Perfil</RouterLink>
            </li>
            <li>
              <RouterLink to="/home" class="dropdown-item">Configurações</RouterLink>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li>
              <button type="button" class="dropdown-item" @click="logout">Sair</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.styled {
  color: #f00;
  font-size: 2rem;
}
</style>
