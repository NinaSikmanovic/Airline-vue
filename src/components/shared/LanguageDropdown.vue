<template>
  <div>
    <div class="dropdown dropend">
      <button class="btn btn-primary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
       Izaberi jezik
      </button>
      <div class="dropdown-menu" aria-labelledby="languageDropdown">
        <button class="dropdown-item" @click="changeLanguage('en')">English</button>
        <button class="dropdown-item" @click="changeLanguage('sr')">Srpski</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
  },
}
</script>