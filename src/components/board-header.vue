<template>
  <section class="board-header">
    <div class="left-side">
      <div class="board-name">
        <input
          type="text"
          ref="myInput"
          v-model="boardName"
          v-if="isEditing"
          @blur="isEditing = !isEditing"
          :style="width"
        />
        <div v-if="!isEditing" @click="editMode">{{ boardName }}</div>
      </div>

      <button @click="setFavorite">
        <img :class="isFavorite" src="../assets/icons/bx-star.svg" alt="star" />
      </button>
      <div class="divider">
      |
      </div>
      <button>Sprint</button>
      <div class="divider">
      |
      </div>
      <!-- <section class="members">
      <div class="member" v-for="member in members" :key="member._id">
        <img :src="member.imgUrl" alt="member" />
      </div>
      <button>Invite</button>
    </section> -->
    </div>
   
    <div class="right-side">
      <button>
          <img src="../assets/icons/bx-filter.svg" alt="">
        <span>Filter</span>
      </button>
      <button>
          <img src="../assets/icons/more-horizontal.svg" alt="">
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
    width(){
      return {
        'max-width': `calc(10% - em(${this.boardName.length*2}px))`
      }
    }
  },
};
</script>

<style></style>
