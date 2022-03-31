<template>
  <section :class="['main-header', txtClr]" :style="`background-color: ${bcg};`">
    <nav>
      <div class="buttons">
        <button>
          <icon-base iconName="grid" class="grid" />
        </button>
        <button @click="goHome">
          <div class="logo-img"></div>
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
        <button @click="toggleCreateModal" class="create-btn">Create</button>
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
          <img :src="user.imgUrl" referrerpolicy="no-referrer" />
        </label>
        <button @click="signOut">logout</button>
      </div>
    </nav>
    <create-board v-if="isCreate" @closeModal="toggleCreateModal" @create="createBoard" />
  </section>
</template>

<script>
import iconBase from './icon-base.vue';
import createBoard from './create-board.vue';

export default {
  data() {
    return {
      isCreate: false,
    };
  },
  methods: {
    signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
    },
    goHome() {
      this.$router.push({ path: '/' });
      this.$store.commit('resetBcg');
    },
    toggleCreateModal() {
      this.isCreate = !this.isCreate;
    },
    async createBoard(board) {
      const id = await this.$store.dispatch({ type: 'createBoard', board });
      this.$router.replace({ path: `/board/${id}` });
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    bcg() {
      return this.$store.getters.bcg
    },
    txtClr() {
      const isDark = this.$store.getters.isDark
      if (!isDark) return 'dark-bcg'
      else return 'light-bcg'
    }
  },
  async created() {
  },
  components: { iconBase, createBoard },
};
</script>
