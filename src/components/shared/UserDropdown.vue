<template>
  <div class="user-dropdown align-self-end">
    <button
        class="btn btn-link user-icon-small"
        type="button"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false">
      <font-awesome-icon :icon="faUser" class="user-icon-large"/>
    </button>
    <ul class="dropdown-menu dropdown-menu-small" aria-labelledby="userDropdown">
      <li>
        <button class="dropdown-item" @click="logout">{{ $t('logout') }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {faUser} from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      faUser: faUser
    }

  },
  methods: {
    logout() {
      this.$store.dispatch('logoutUser');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.user-dropdown {
  position: relative;
  display: inline-block;
}

@media (max-width: 425px) {
  .dropdown-menu-small {
    min-width: 40px;
  }
}

@media (max-width: 768px) {
  .user-icon-small {
    padding: 6px;
  }

}

.user-icon-large {
  font-size: 24px;
  color: var(--color-gray);
}

.cursor-pointer {
  cursor: pointer;
}
</style>
