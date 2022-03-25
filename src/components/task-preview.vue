<template>
  <section
    class="task-preview"
    @click="openModalDetails"
  >
    <div class="task-labels">
      <div
        class="task-label"
        v-for="label in task.labels"
        :key="label.id"
        :style="'background-color:'+label.color"
      >{{label.title}}</div>
    </div>
    <textarea
      :class="{ isEditing: isEditing }"
      v-model="taskToEdit.title"
      ref="textarea"
      :disabled="!isEditing"
      @blur="saveEdit(task)"
    >
    </textarea>

    <button @click="removeTask(task.id, group.id)">
      <img
        src="../assets/icons/x.svg"
        alt="delete"
      />
    </button>
    <button @click.stop="editTask(task, group.id)">
      <img
        src="../assets/icons/bx-pencil.svg"
        alt="edit"
      />
    </button>
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    group: {
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
    openModalDetails() {
      this.$emit("onOpen");
    },
    async saveEdit() {
      this.isEditing = false;
      this.$emit("editTask", { ...this.taskToEdit });
    },

    removeTask(taskId, groupId) {
      this.$emit("removeTask", taskId, groupId);
    },

    editTask(task, groupId) {
      this.isEditing = true;
      this.$nextTick(() => this.$refs.textarea.focus());
    },
    updateHeigh() {
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
