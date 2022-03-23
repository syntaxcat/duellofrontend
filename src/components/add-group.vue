<template>
  <section class="add-group">
    <button @click="addedGroup = !addedGroup" v-if="!addedGroup">
      <img src="../assets/icons/plus.svg" alt="add list" />
      <span>Add another list</span>
    </button>

    <form class="add-group-form" @submit.prevent="addGroup" v-else>
      <input type="text" placeholder="Enter list title..." v-model="title" />
      <button type="submit">Add list</button>

      <button @click="addedGroup = !addedGroup">
        <img src="../assets/icons/x.svg" alt="close form" />
      </button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      addedGroup: false,
      title: "",
    };
  },
  methods: {
    addGroup() {
      if (!this.title) return;

      this.$emit('addGroup', this.title)
    },
  },
};
</script>

<style>
.add-group-form {
  border: 1px solid rgb(0, 0, 0);
  padding: 10px;
  width: 15rem;
}
</style>
