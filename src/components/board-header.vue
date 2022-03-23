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
          :size="width"
          
        />
        <div v-if="!isEditing" @click="editMode">{{ boardName }}</div>
      </div>

      <button @click="setFavorite">
        <img :class="isFavorite" class="starred" src="../assets/icons/bx-star.svg" alt="star" />
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
          <img src="../assets/icons/bx-filter.svg" alt="filter">
        <span>Filter</span>
      </button>
      <button>
          <img src="../assets/icons/more-horizontal.svg" alt="more">
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
      isEditing: false,
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
      return this.boardName.length
    }
  },
};
</script>
