<template>
  <div class="app-loader" :style="{height: height}">
    <img src="@/assets/loader.svg" alt="loader">
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '400px'
    }
  }
}
</script>
