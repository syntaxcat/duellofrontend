<template>
  <section class="board-header">
    <div class="right-side">
      <div class="board-name">
        <input
          type="text"
          ref="myInput"
          v-model="boardName"
          v-if="isEditing"
          @blur="isEditing = !isEditing"
        />
        <span v-if="!isEditing" @click="editMode">{{ boardName }}</span>
      </div>

      <button @click="setFavorite">
        <img :class="isFavorite" src="../assets/imgs/bx-star.svg" alt="star" />
      </button>
      |
      <button>Sprint</button>
      |
      <!-- <section class="members">
      <div class="member" v-for="member in members" :key="member._id">
        <img :src="member.imgUrl" alt="member" />
      </div>
      <button>Invite</button>
    </section> -->
    </div>
    <div class="left-side">
      <button>
          <img src="../assets/imgs/bx-filter.svg" alt="">
        <span>Filter</span>
      </button>
      <button>
          <img src="../assets/imgs/more-horizontal.svg" alt="">
        <span>Show menu</span>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      boardName: "Duello",
      isEditing: true,
      isFull: false,
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
  },
  computed: {
    isFavorite() {
      return this.isFull ? "full-star" : "empty-star";
    },
  },
};
</script>

<style></style>
