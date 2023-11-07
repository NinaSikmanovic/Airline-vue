<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {},
  mounted() {
    document.title = 'Airlane-app';
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-gray);
}
</style>
