<script setup lang="ts">
import { defineComponent } from 'vue';
defineComponent({
  name: 'MainView',

});
</script>

<template>
  <div class="d-flex gap-3 align-items-center">
    <div class="">
      <h1 class="brand"><span class="styled">A</span>tendly</h1>
      <div class="cutter">
        <div class="cover"></div>
      </div>
    </div>
    <section class="w-100">
      <RouterView />
    </section>
  </div>
  <footer>
    <p class="mt-5 mb-3 text-muted">Atendly © 2024</p>
  </footer>
</template>

<style scoped>
.brand {
  font-size: 3rem;
  font-family: "Chalkduster, fantasy";
  font-weight: 700;
  color: #000;
}

.styled {
  color: #f00;
  font-size: 4rem;
}

.cover {
  position: relative;
  width: 700px;
  height: 600px;
  background-image: url('../assets/background-login.png');
  background-size: cover;
}

.cutter {
  opacity: 0.1;
  top: calc(50% - 355px);
  left: calc(50% - 550px);
  position: absolute;
  width: 450px;
  overflow: hidden;
  z-index: -1;
}
</style>
