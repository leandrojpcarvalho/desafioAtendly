<template>
  <HeaderSection />
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderSection from '../components/Header.vue';
export default defineComponent({
  name: 'LoggedView',
  components: {
    HeaderSection,
  },
});
</script>
