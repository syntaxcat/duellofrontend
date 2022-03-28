<template>
  <section class="main-header">
    <nav>
      <div class="buttons">
        <button>
          <icon-base iconName="grid" class="grid" />
        </button>
        <button @click="goHome">
          <div class="logo-img"></div>
          <!-- <img src="../assets/icons/trello.svg" alt="trello" /> -->
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
          <img :src="user.imgUrl" />
        </label>
      </div>
    </nav>
  </section>
  <create-board v-if="isCreate" @closeModal="toggleCreateModal" @create="createBoard" />
</template>

<script>
import iconBase from './icon-base.vue';
import createBoard from "./create-board.vue";
export default {
  data() {
    return {
      isCreate: false
    }
  },
  methods: {
    goHome() {
      this.$router.push({ path: '/' });
    },
    toggleCreateModal() {
      this.isCreate = !this.isCreate
    },
    createBoard(board) {
      this.$store.dispatch({ type: 'createBoard', board })
      this.$router.replace({ path: `/board/${board._id}` })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  components: { iconBase, createBoard },
};
</script>
