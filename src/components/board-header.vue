<template>
  <section>
    <section>
      <board-menu @closeMenu="toggleMenu" v-if="isMenuOpen"></board-menu>
    </section>

    <section class="board-header">
      <div class="board-details">
        <div class="board-name-and-star">
          <input
            type="text"
            ref="myInput"
            v-model="boardName"
            v-if="isEditing"
            @blur="isEditing = !isEditing"
            :size="width"
          />
          <div v-if="!isEditing" @click="editMode">{{ boardName }}</div>

          <button @click="setFavorite">
            <img :class="isFavorite" class="starred" src="../assets/icons/bx-star.svg" alt="star" />
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
        <button>
          <img src="../assets/icons/bx-filter.svg" alt="filter" />
          <span>Filter</span>
        </button>
        <button @click="toggleMenu">
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
      boardName: 'Duello',
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
  },
  computed: {
    isFavorite() {
      return this.isFull ? 'full-star' : 'empty-star';
    },
    width() {
      return this.boardName.length;
    },
  },
  components: {
    iconBase,
    boardMenu
  },
};
</script>
