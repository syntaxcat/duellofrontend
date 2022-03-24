<template>
  <section class="create-board">
    <div>
      <span>Create board</span>
      <hr />
    </div>

    <img src="../assets/imgs/welcome-img.png" alt="" />

    <div class="background-picker">
      <div v-for="background in backgrounds" :key="background">
        <!-- <img @click="setBackground(background.src)" :src="background.src"> -->
        <span @click="setBackground(background)">{{ background }}</span>
      </div>
    </div>

    <label for="title">
      Board title
      <input ref="myInput" type="text" id="title" v-model="boardToEdit.title" />
    </label>

    <button @click="create">Create</button>
  </section>
</template>

<script>
import { boardService } from "../services/board.service";
import { userService } from "../services/user.service";

export default {
  data() {
    return {
      boardToEdit: boardService.getEmptyBoard(),
      loggedinUser: null,
      backgrounds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
   created() {
    this.loggedinUser = this.$store.getters.user;
    // console.log(this.loggedinUser);
  },
  mounted() {
    this.$refs.myInput.focus();
  },
  methods: {
    setBackground(src) {
      // console.log(src);
      this.boardToEdit.style.backgroundImg = src;
    },
    create() {
      if (
        !this.boardToEdit.style.backgroundImg ||
        !this.boardToEdit.title ||
        !this.loggedinUser
      )
        return;

      this.boardToEdit.createdBy = this.loggedinUser;
      this.$emit("create", { ...this.boardToEdit });
    },
  },
};
</script>

<style></style>
