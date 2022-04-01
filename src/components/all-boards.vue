<template>
  <section class="all-boards">
    <div class="starred" v-if="boards">
      <div class="all-board-header">
        <icon-base iconName="star" class="board-icon" />
        <h3>Starred boards</h3>
      </div>

      <div class="boards-container">
        <ul>
          <li v-for="board in starredBoards" :key="board._id">
            <a
              :href="'/#/board/' + board._id"
              class="board-title full-star"
              :style="
                board.style.type === 'img'
                  ? `background-image: url(${board.style.backgroundImg})`
                  : `background-color:${board.style.color}`
              "
            >
              <span class="board-title-fade"></span>

              <div class="board-title-content">
                <div class="title">{{ board.title }}</div>
                <div class="container">
                  <span>{{ board.subName }}</span>
                  <icon-base iconName="starS" class="board-title-icon" @click.prevent="toggleFavorites(board)" />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="recently-viewed">
      <div class="all-board-header">
        <icon-base iconName="trello-clock" class="board-icon" />
        <h3>Recently viewed</h3>
      </div>

      <div class="boards-container">
        <ul>
          <li v-for="board in unStarredBoards" :key="board._id">
            <a
              :href="'/#/board/' + board._id"
              class="board-title"
              :style="
                board.style.type === 'img'
                  ? `background-image: url(${board.style.backgroundImg})`
                  : `background-color:${board.style.color}`
              "
            >
              <span class="board-title-fade"></span>

              <div class="board-title-content">
                <div class="title">{{ board.title }}</div>
                <div class="container">
                  <span>{{ board.subName }}</span>
                  <icon-base iconName="starS" class="board-title-icon" @click.prevent="toggleFavorites(board)" />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="workspace">
      <h3>YOUR WORKSPACES</h3>
      <div class="all-board-header">
        <div class="container-header">
          <div class="letter">S</div>
          <h3>Sprint</h3>
          <div class="options">
            <a href="#">
              <div class="li-icon">
                <icon-base iconName="board" />
              </div>
              <span>Boards</span>
            </a>
            <a href="#">
              <div class="li-icon">
                <icon-base iconName="views" />
              </div>
              <span>Views</span>
            </a>
            <a href="#">
              <div class="li-icon">
                <icon-base iconName="member" />
              </div>
              <span>Members (4)</span>
            </a>
            <a href="#">
              <div class="li-icon">
                <icon-base iconName="settings" />
              </div>
              <span>Settings</span>
            </a>
          </div>
          <div class="upgrade">
            <button>
              <div class="li-icon">
                <icon-base iconName="suitcase" />
              </div>
              <div>Upgrade</div>
            </button>
          </div>
        </div>
      </div>
      <div class="boards-container">
        <ul>
          <li v-for="board in boards" :key="board._id">
            <a
              :href="'/#/board/' + board._id"
              class="board-title"
              :style="
                board.style.type === 'img'
                  ? `background-image: url(${board.style.backgroundImg})`
                  : `background-color:${board.style.color}`
              "
            >
              <span class="board-title-fade"></span>
              <div class="board-title-content">
                <div class="title">{{ board.title }}</div>
                <div class="container">
                  <span>{{ board.subName }}</span>
                  <icon-base iconName="starS" :class="['board-title-icon', 'full-star']" />
                </div>
              </div>
            </a>
          </li>

          <li class="last">
            <div class="board-title create">
              <!-- <span class="board-title-fade"></span> -->
              <p>Create new board</p>
              <p>
                <span>5 remaining</span>
              </p>
              <div class="li-icon">
                <icon-base iconName="help" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <button class="home-page-btn">View all closed boards</button>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';

export default {
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  created() {
    console.log(this.boards);
  },
  methods: {
    toggleFavorites(board) {
      board.isStarred = !board.isStarred;
      this.$store.dispatch({ type: 'updateBoard', board });
    },
  },
  computed: {
    isFavorite() {
      // console.log(this.board.isStarred);
      return this.board.isStarred ? 'full-star' : 'empty-star';
    },
    starredBoards() {
      return this.boards.filter((board) => board.isStarred);
    },
    unStarredBoards() {
      return this.boards.filter((board) => !board.isStarred);
    },
  },
  components: { iconBase },
};
</script>

<style></style>
