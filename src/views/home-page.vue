<template>
  <section class="home-page">
    <main-header />
    <svg class="loading" v-if="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
      <line class="line animated" x1="14" y1="10" x2="14" y2="50" />
      <line class="line animated line2" x1="30" y1="10" x2="30" y2="50" />
      <line class="line animated line3" x1="46" y1="10" x2="46" y2="50" />
    </svg>

    <div v-else class="main-container">
      <div class="nav-bar">
        <div>
          <ul>
            <li v-for="option in options" :key="option.name" :class="[option.class]" @click="visit(option.type)">
              <div class="li-icon">
                <icon-base :iconName="option.type" />
              </div>
              <span class="option">{{ option.txt }}</span>
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
      <all-boards v-if="boards" :boards="boards" />
    </div>
  </section>
</template>

<script>
import iconBase from '../components/icon-base.vue';
import mainHeader from '../components/main-header.vue';
import boardList from '../components/board-list.vue';
import createBoard from '../components/create-board.vue';
import allBoards from '../components/all-boards.vue';

export default {
  data() {
    return {
      loggedinUser: null,
      boards: null,
      isOpen: false,
      loading: true,
      options: [
        { type: 'board', txt: 'Boards', class: 'visiting' },
        { type: 'template-board', txt: 'Templates', class: '' },
        { type: 'home', txt: 'Home', class: '' },
      ],
    };
  },
  async created() {
    const user = await this.$store.dispatch('loadUser');
    if (!this.$store.getters.user) this.$router.push('/welcome');
    this.loggedinUser = this.$store.getters.user;
    const boards = await this.$store.dispatch({
      type: 'loadBoards',
      filterBy: { userId: this.loggedinUser._id },
    });
    this.boards = boards;
    this.$store.dispatch('loadDesign');
    this.loading = false;
  },
  methods: {
    visit(type) {
      this.options = this.options.map((option) => {
        if (option.type === type) {
          option.class = 'visiting';
          return option;
        }
        option.class = '';

        return option;
      });
    },
  },
  computed: {
    direction() {
      return this.isOpen ? 'open' : '';
    },
    isFavorite() {
      console.log(this.board.isStarred);
      if (this.board.isStarred) return 'full-star';
      else return 'empty-star';
      // return this.isFull ? 'full-star' : 'empty-star';
    },
  },
  components: {
    mainHeader,
    boardList,
    createBoard,
    iconBase,
    allBoards,
  },
};
</script>
