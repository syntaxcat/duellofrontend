<template>
  <section class="main-header">
    <nav>
      <div class="buttons">
        <button>
          <icon-base iconName="grid" class="grid" />
        </button>
        <button @click="goHome">
          <img src="../assets/icons/trello.svg" alt="trello" />
          <span>Duello</span>
        </button>
        <button>
          Workspaces
          <icon-base iconName="chevron-down" />
        </button>
        <button>
          Recent
          <icon-base iconName="chevron-down" />
        </button>
        <button>
          Starred
          <icon-base iconName="chevron-down" />
        </button>
        <button>
          Templates
          <icon-base iconName="chevron-down" />
        </button>
        <button class="create-btn">Create</button>
      </div>
      <div class="information">
        <div class="search-input">
          <icon-base iconName="search" class="search" />
          <input type="text" placeholder="Search" />
        </div>
        <button>
          <icon-base iconName="information" class="info" />
        </button>
        <button class="bell-btn">
          <icon-base iconName="alert" class="alert" />
        </button>
        <label v-if="user" class="user-icon">
          <img :src="user.imgUrl" />
        </label>
      </div>
    </nav>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';
export default {
  methods: {
    goHome() {
      this.$router.push({ path: '/' });
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components: { iconBase },
};
</script>
