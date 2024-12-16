<script lang="ts">
import { defineComponent } from 'vue';
import store from '../store';
export default defineComponent({
  name: 'HomePage',
  setup() {
    const { name } = store.state.frontHandler.userInfo;
    return { name };
  },
  computed: {
    salut: function () {
      const splitName = this.name.split(' ');
      const lastLetter = splitName[0].charAt(splitName[0].length - 1);
      if (lastLetter === 'a') {
        return 'Bem-vinda, ' + this.name + '!';
      }
      return 'Bem-vindo, ' + this.name + '!';
    }
  }
});
</script>

<template>
  <h2>
    {{ salut }}
  </h2>
</template>
