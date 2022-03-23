<template>
  <section class="task-preview">
    <!-- {{ task.title }} -->
    <textarea
      type="text"
      :class="{ isEditing: isEditing }"
      v-model="taskToEdit.title"
      ref="textarea"
      @click="isEditing = true"
      @blur="edit"
    ></textarea>
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
        taskToEdit: { ...this.task },
      };
    },
    methods: {
      edit() {
        this.isEditing = false;

        if (this.taskToEdit.title !== this.task.title)
          this.$emit("editTask", this.taskToEdit);
      },
      updateHeigh() {
        this.$refs.textarea.style.height = 0;
        this.$refs.textarea.style.height =
          this.$refs.textarea.scrollHeight + "px";
      },
    },
    mounted() {
      this.updateHeigh();
    },
    watch: {
      taskToEdit: {
        handler(val) {
          this.updateHeigh();
        },
        deep: true,
      },
    },
    computed: {},
  };
</script>

<style></style>
