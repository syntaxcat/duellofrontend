<template>
  <section class="main-header" :style="'background-color:' + bcg">
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
import { designService } from '../services/design.services';
export default {
  data() {
    return {
      isCreate: false,
      currBoard: this.$store.getters.board,
      bcg: null
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
  // currBoard(){
  //   return this.$store.getters.board
  // },
  async created() {
    setTimeout(async ()=> {
      const board = this.$store.getters.board
      if (!board) this.bcg = '#026aa7'
      else if (board.style.type === 'img') {
        const color = await designService.getAvgColor(board.style.backgroundImg)
        console.log(color.hex)
        this.bcg = color.hex
      }
      else {
        console.log('wtf')
        this.bcg = '#00000029'
      }
      console.log(this.bcg)

    }, 1)

  },
  components: { iconBase, createBoard },
};
</script>
