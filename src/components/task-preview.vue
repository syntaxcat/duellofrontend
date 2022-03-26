<template>
  <section class="task-preview" @click="openModalDetails">
    <div class="task-labels">
      <div
        class="task-label"
        v-for="label in task.labels"
        :key="label.id"
        :style="'background-color:' + label.color"
        :class="labelsExpanded ? 'expand' : 'shrink'"
        @click="toggleLabelsExpand"
      >
        <span :class="labelsExpanded ? 'show' : 'hide'">{{ label.title }}&nbsp;</span>
      </div>
    </div>
    <textarea
      :class="{ isEditing: isEditing }"
      v-model="taskToEditPartial.title"
      ref="textarea"
      :disabled="!isEditing"
      @blur="saveEdit(task)"
    >
    </textarea>
    <span v-if="task.dueDate" class="due-date">
      <icon-base iconName="clock" />
      {{ formatDate(this.task.dueDate) }}
    </span>

    <button @click="removeTask(task.id, group.id)">
      <img src="../assets/icons/x.svg" alt="delete" />
    </button>
    <button @click.stop="editTask(task, group.id)">
      <img src="../assets/icons/bx-pencil.svg" alt="edit" />
    </button>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';
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
      taskToEditPartial: { title: this.task.title, id: this.task.id },
    };
  },
  methods: {
    formatDate() {
      const date = new Date(this.task.dueDate);
      return date.toLocaleString('default', {
        month: 'short',
        day: 'numeric',
      });
    },
    toggleLabelsExpand(e) {
      e.stopPropagation();
      this.$emit('toggleLabelsExpanded');
    },
    openModalDetails() {
      this.$emit('onOpen');
    },
    async saveEdit() {
      this.isEditing = false;
      this.$emit('editTask', this.taskToEditPartial);
    },

    removeTask(taskId, groupId) {
      this.$emit('removeTask', taskId, groupId);
    },

    editTask(task, groupId) {
      this.isEditing = true;
      this.$nextTick(() => this.$refs.textarea.focus());
    },
    updateHeigh() {
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
    },
  },
  mounted() {
    this.updateHeigh();
  },
  watch: {
    taskToEditPartial: {
      handler(val) {
        this.updateHeigh();
      },
      deep: true,
    },
  },
  computed: {
    labelsExpanded() {
      return this.$store.getters.labelsExpanded;
    },
  },
  components: {
    iconBase,
  },
};
</script>
