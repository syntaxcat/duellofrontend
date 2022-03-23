<template>
  <section class="task-preview">
    <!-- {{ task.title }} -->
    <input
          type="text"
          ref="myInput"
          v-model="taskToEdit.title"
          v-if="isEditing"
          @blur="edit"
        />
        <div v-if="!isEditing" @click="edit">{{ taskToEdit.title }}</div>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
        taskToEdit: {...this.task},
    }
  },
  methods:{
    edit() {
        this.isEditing = !this.isEditing;
        if (this.isEditing) this.$nextTick(() => this.$refs.myInput.focus());

        if (this.taskToEdit.title !== this.task.title)
          this.$emit("editTask", this.taskToEdit);
      }
  },
  computed:{}
};
</script>

<style></style>
