<script setup lang="ts">
import { defineComponent } from 'vue';
defineComponent({
  name: 'MainView',

});
</script>

<template>
  <div class="d-flex gap-3 align-items-center min">
    <div class="">
      <h1 class="brand"><span class="styled">A</span>tendly</h1>
      <div class="cutter">
        <div class="cover"></div>
      </div>
    </div>
    <section class="shadow-sm p-3 glass">
      <RouterView />
    </section>
  </div>
  <footer>
    <p class="mt-5 mb-3 text-muted">Atendly © 2024</p>
  </footer>
</template>

<style scoped>
.glass {
  /* From https://css.glass */
  background: rgba(163, 163, 163, 0.6);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.3px);
  -webkit-backdrop-filter: blur(8.3px);
  border: 1px solid rgba(163, 163, 163, 0.14);
}

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
  width: 100%;
  height: 100%;
  background-image: url(/src/assets/background-login.png);
  background-size: cover;
}

.cutter {
  opacity: 0.3;
  top: calc(50% - 450px);
  left: calc(50% - 125px);
  position: absolute;
  width: 860px;
  height: 654px;
  overflow: hidden;
  z-index: -1;
}

@media screen and (max-width: 620px) {
  .min {
    flex-direction: column;
  }

  .cutter {
    display: none;
  }
}
</style>
