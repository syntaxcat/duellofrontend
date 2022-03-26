<template>
  <section class="home-page">
    <mainHeader />
    <!-- <create-board @create="createBoard" /> -->
    <h1>Home page</h1>
    <div v-if="boards">
      <div v-for="board in boards" :key="board._id">
        <board-list :board="board"></board-list>
      </div>
    </div>
  </section>
</template>

<script>
import mainHeader from '../components/main-header.vue';
import boardList from '../components/board-list.vue';
import createBoard from '../components/create-board.vue';

export default {
  data() {
    return {
      loggedinUser: null,
      boards: null,
    };
  },
  async created() {
    // const user = await this.$store.dispatch('loadUser')
    // if (!user) this.$router.push('/welcome')
    this.loggedinUser = this.$store.getters.user;
    const boards = await this.$store.dispatch({
      type: 'loadBoards',
      filterBy: { userId: this.loggedinUser._id },
    });
    console.log(boards);
    this.boards = boards;
  },
  methods: {
    async createBoard(newBoard) {
      const boardId = await this.$store.dispatch({
        type: 'createBoard',
        board: newBoard,
      });
      console.log(boardId);
      this.$router.push({ path: `/board/${boardId}` });
    },
  },
  components: {
    mainHeader,
    boardList,
    createBoard,
  },
};
</script>
