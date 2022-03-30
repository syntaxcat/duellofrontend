<template>
  <section>
    <section>
      <board-menu @closeMenu="toggleMenu" v-if="isMenuOpen"></board-menu>
    </section>

    <section class="board-header" v-if="board">
      <div class="board-details">
        <div class="board-name-and-star">
          <input
            type="text"
            ref="myInput"
            v-model="board.title"
            v-if="isEditing"
            @blur="isEditing = !isEditing"
            @input="changeTitle"
            :size="width"
          />
          <div v-if="!isEditing" @click="editMode">{{ board.title }}</div>

          <button @click="setFavorite">
            <icon-base iconName="star" :class="[isFavorite, 'starred']" @click="toggleFavorites" />
          </button>
          |
        </div>
        <button class="name-btn">Sprint</button> |
        <!-- <section class="members">
      <div class="member" v-for="member in members" :key="member._id">
        <img :src="member.imgUrl" alt="member" />
      </div>
      <button>Invite</button>
    </section> -->
      </div>

      <div class="options">
        <button class="filter-btn">
          <icon-base iconName="filter" />
          <span>Filter</span>
        </button>
        <button class="show-menu-btn" @click="toggleMenu">
          <icon-base iconName="more" />
          <!-- <img src="../assets/icons/more-horizontal.svg" alt="more" /> -->
          <span>Show menu</span>
        </button>
      </div>
    </section>
  </section>
</template>

<script>
import iconBase from '../components/icon-base.vue';
import boardMenu from './board-menu.vue';
export default {
  components: { boardMenu },
  data() {
    return {
      // boardName: 'Duello',
      isEditing: false,
      isFull: false,
      isMenuOpen: false,
      // openMenu: false
    };
  },
  methods: {
    editMode() {
      this.isEditing = !this.isEditing;
      this.$nextTick(() => this.$refs.myInput.focus());
    },
    setFavorite(boardId) {
      this.isFull = !this.isFull;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    changeTitle(){
      this.$store.dispatch({type:'updateBoard', board:this.board})
    },
    toggleFavorites(){
      this.board.isStarred = !this.board.isStarred
      this.$store.dispatch({type: 'updateBoard', board:this.board})
    }
  },
  computed: {
    isFavorite() {
      console.log(this.board.isStarred)
      if(this.board.isStarred) return 'full-star'
      else return 'empty-star'
      // return this.isFull ? 'full-star' : 'empty-star';
    },
    width() {
      return this.board.title.length;
    },
    board(){
      return JSON.parse(JSON.stringify(this.$store.getters.board))
    }
  },
  components: {
    iconBase,
    boardMenu
  },
};
</script>
