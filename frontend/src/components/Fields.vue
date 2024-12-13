<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginForm',
})
</script>

<template>
  <div class="container">
    <h1>Login</h1>
    <form>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type='button'>Login</button>
    </form>
  </div>
</template>
