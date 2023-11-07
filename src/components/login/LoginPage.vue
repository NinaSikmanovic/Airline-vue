<template>
  <div class="login-page">
    <language-dropdown></language-dropdown>
    <div class="card login-form-container">
      <div class="card-header">
        {{ $t('login') }}
      </div>
      <div class="alert alert-danger m-3" v-if="loginError">{{ $t('loginError') }}</div>
      <div class="card-body">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">{{ $t('username') }}</label>
            <input
                type="text"
                id="username"
                v-model="formData.username"
                class="form-control"
                required
                :class="{ 'is-invalid': isUsernameInvalid }">
            <div class="invalid-feedback">
              {{ $t('usernameLengthWarning') }}
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">{{ $t('password') }}</label>
            <input
                type="password"
                id="password"
                v-model="formData.password"
                class="form-control"
                required
                :class="{ 'is-invalid': isPasswordInvalid }">
            <div class="invalid-feedback">
              {{ $t('passwordLengthWarning') }}
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit"
                    class="btn btn-primary"
                    :disabled="isFormInvalid">
              {{ $t('login') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import users from "/db/users.json";
import store from '/src/store/index.js';
import LanguageDropdown from "@/components/shared/LanguageDropdown";


export default {
  components: {
    LanguageDropdown
  },
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      loginError: false
    }
  },
  mounted() {
    if (store.state.user) {
      this.$router.push(`/flights`);
    }
  },
  computed: {
    isUsernameInvalid() {
      return this.formData.username && this.formData.username.length < 4;
    },
    isPasswordInvalid() {
      return this.formData.password && this.formData.password.length < 4;
    },
    isFormInvalid() {
      return this.formData.password.length < 4 || this.formData.username.length < 4;
    }
  },
  methods: {
    async login(event) {
      event.preventDefault();

      if (!this.formData.username || !this.formData.password) {
        return;
      }

      const foundUser = users.find((user) => user.username === this.formData.username && user.password === this.formData.password);

      if (foundUser) {
        this.$store.commit('setUser', foundUser);
        this.$router.push(`/flights`);
      } else {
        this.loginError = true;
      }
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
  }
};
</script>


<style scoped>

.login-page {
  background-color: var(--color-primary);
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: 10px;
}

.login-form-container {
  width: 500px;
  margin-top: 60px;
}

</style>
