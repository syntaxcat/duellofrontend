<template>
  <section class="board-header">
    <div class="board-header-btn">
      <input type="text" v-model="boardName" v-if="isEditing" @blur="isEditing = !isEditing"
      autofocus />
      <span v-if="!isEditing" @click="editMode">{{
        boardName
      }}</span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      boardName: "Duello",
      isEditing: false,
    };
  },
  methods:{
      editMode(){
          this.isEditing = !this.isEditing
        //   this.$refs.myInput.focus()
      }
  },
  computed:{
      focus(){
          return this.isEditing ? 'autofocus' : ''
      }
  }
};
</script>

<style></style>
