<template>
  <section class="home-page">
    <main-header />

    <div class="main-container">
      <div class="nav-bar">
        <div>
          <ul>
            <li>
              <div class="li-icon">
                <icon-base iconName="board" />
              </div>
              <span>Boards</span>
            </li>
            <li>
              <div class="li-icon">
                <icon-base iconName="template-board" />
              </div>
              <span>Templates</span>
            </li>
            <li>
              <div class="li-icon">
                <icon-base iconName="home" />
              </div>
              <span>Home</span>
            </li>
          </ul>
        </div>

        <div>
          <div>
            <span>Workspaces</span>
            <div class="icon-plus">
              <icon-base iconName="plus-s" />
            </div>
          </div>

          <div>
            <div :class="['container', direction]" @click="isOpen = !isOpen">
              <div class="letter">S</div>
              <span>Sprint</span>
              <icon-base iconName="presentation" class="presentation" />
            </div>

            <ul :class="['dropdown', direction]">
              <li>
                <div class="li-icon">
                  <icon-base iconName="board" />
                </div>
                <span>Boards</span>
              </li>
              <li>
                <div class="li-icon">
                  <icon-base iconName="hart" />
                </div>
                <span>Highlights</span>
              </li>
              <li>
                <div class="li-icon">
                  <icon-base iconName="views" />
                </div>
                <span>Views</span>
                <div class="icon-plus">
                  <icon-base iconName="forward" />
                </div>
              </li>
              <li>
                <div class="li-icon">
                  <icon-base iconName="members" />
                </div>
                <span>Members</span>
                <div class="icon-plus">
                  <icon-base iconName="plus-s" />
                  <icon-base iconName="forward" />
                </div>
              </li>
              <li>
                <div class="li-icon">
                  <icon-base iconName="settings" />
                </div>
                <span>Settings</span>
                <div class="icon-plus">
                  <icon-base iconName="forward" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="all-boards"></div>
    </div>

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
import iconBase from '../components/icon-base.vue';

export default {
  data() {
    return {
      loggedinUser: null,
      boards: null,
      isOpen: false,
    };
  },
  async created() {
    // const user = await this.$store.dispatch('loadUser')
    if (!this.$store.getters.user) this.$router.push('/welcome')
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
  computed: {
    direction() {
      return this.isOpen ? 'open' : '';
    },
  },
  components: {
    mainHeader,
    boardList,
    createBoard,
    iconBase,
  },
};
</script>
