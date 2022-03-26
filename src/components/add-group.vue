<template>
  <section class="add-group">
    <div class="add-group-content" @click="addedGroup = !addedGroup" v-if="!addedGroup">
      <icon-base class="plus-btn" iconName="Plus"></icon-base>
      <span>Add another list</span>
    </div>

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
import iconBase from './icon-base.vue';
export default {
  data() {
    return {
      addedGroup: false,
      title: '',
    };
  },
  methods: {
    addGroup() {
      if (!this.title) return;

      this.$emit('addGroup', this.title);

      this.title = '';
    },
  },
  components: { iconBase },
};
</script>
