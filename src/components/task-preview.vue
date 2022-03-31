<template>
  <section class="task-preview" v-if="task">
    <!-- <div v-if="isCover" class="task-prev-cover" :style="coverStyle">
      <img class="cover-img" v-if="task.style.cover.type === 'img'" :src="task.style.cover.imgUrl" />
    </div>-->
    <div v-if="!isCoverBcg" class="task-labels">
      <div
        class="task-label"
        v-for="label in labels"
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
    ></textarea>
    <!-- <button @click.stop="editTask(task, group.id)" class="edit-btn"> -->
    <!-- <icon-base iconName="pencil"></icon-base> -->
    <!-- <img src="../assets/icons/bx-pencil.svg" alt="edit" /> -->
    <!-- </button> -->
    <div v-if="!isCoverBcg" class="task-extras">
      <div class="left">
        <span v-if="task.dueDate" class="due-date">
          <icon-base iconName="clock" />
          {{ formatDate(this.task.dueDate) }}
        </span>
        <span v-if="numberOfAttachments > 0" class="number-of-attachments">
          <icon-base iconName="attachment" />
          {{ numberOfAttachments }}
        </span>
        <span v-if="task.description" class="description-display">
          <icon-base iconName="description" />
        </span>
        <span v-if="numberOfComments > 0" class="comment-display">
          <icon-base iconName="comment" />
          {{ numberOfComments }}
        </span>
        <div
          class="checklist-display"
          v-if="
            this.task.checklist &&
            this.task.checklist.length &&
            this.task.checklist[0].todos &&
            this.task.checklist[0].todos.length
          "
        >
          <icon-base iconName="checklist" />
          <span>{{ checklistStatus }}</span>
        </div>
      </div>
      <div class="member-list">
        <img v-for="member in task.members" :key="member._id" :src="member.imgUrl" />
      </div>
    </div>
  </section>
  <!-- <button @click.stop="removeTask(task.id, group.id)">
          <img src="../assets/icons/x.svg" alt="delete" />
  </button>-->
</template>

<script>
import iconBase from './icon-base.vue';
import { eventBus } from '../services/eventBus.service.js';

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
      taskCover: null,
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
    async saveEdit() {
      this.isEditing = false;
      this.$emit('editTask', this.taskToEditPartial);
    },

    removeTask(taskId, groupId) {
      this.$emit('removeTask', taskId, groupId);
    },

    editTask(taskId) {
      if (taskId === this.task.id) {
        this.isEditing = true;
        this.$nextTick(() => this.$refs.textarea.focus());
      }
    },
    updateHeigh() {
      if (this.task.style.cover.style === 'background') {
        this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
      } else this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight - 15 + 'px';
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
    numberOfAttachments() {
      return this.task.attachments.length;
    },
    numberOfComments() {
      return this.task.comments.length;
    },
    labelsExpanded() {
      return this.$store.getters.labelsExpanded;
    },
    labels() {
      return this.$store.getters.boardLabels.filter((label) => {
        if (!this.task.labelIds) return false;
        return this.task.labelIds.includes(label.id);
      });
    },
    isCover() {
      if (!this.task.style.cover.type) return false;
      return true;
    },
    coverStyle() {
      if (this.task.style.cover.type === 'color') {
        return `background-color: ${this.task.style.cover.color}; height: 32px`;
      }
      // else if (this.task.style.cover.type === 'img') {
      //   return `background-image: url(${this.task.style.cover.imgUrl}); max-height: 260px`
      // }
      else return '';
    },
    isCoverBcg() {
      if (this.task.style.cover.style === 'background') return true;
      else return false;
    },
    checklistStatus() {
      if (!this.task.checklist || !this.task.checklist.length) return;

      const length = this.task.checklist[0].todos.length;
      console.log(length);

      if (!this.task.checklist[0].todos || !length) {
        var done = [];
      } else done = this.task.checklist[0].todos.filter((todo) => todo.isDone);
      return `${done.length}/${length}`;
    },
  },
  components: {
    iconBase,
  },
  created() {
    this.unsubscribe = eventBus.on('editTask', this.editTask);
    // this.taskCover = this.task.style.cover
  },
  unmounted() {
    this.unsubscribe();
  },
};
</script>
