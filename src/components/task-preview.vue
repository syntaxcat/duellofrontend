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
      @blur="editTask()"
      @input="saveEdit(task)"
    ></textarea>
    <div v-if="!isCoverBcg" class="task-extras">
      <div class="left">
        <span v-if="task.dueDate" :class="['due-date', isDuePassed, isDueCompleted]">
          <icon-base class="due-icon-clock" iconName="clock" />
          <icon-base class="due-icon-checked" @click.stop="isDueComplete = !isDueComplete" iconName="checked" />
          <icon-base class="due-icon-unchecked" @click.stop="isDueComplete = !isDueComplete" iconName="unchecked" />
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
          :class="{ 'checklist-display': true, done: isChecklistDone }"
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
    </div>
    <div class="member-list">
      <img v-for="member in task.members" :key="member._id" :src="member.imgUrl" />
    </div>
  </section>
</template>

<script>
import { eventBus } from '../services/eventBus.service.js';
import { isAfter, isBefore } from 'date-fns';
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
      taskCover: null,
      isDueComplete: false,
      dueStatus: null,
    };
  },
  methods: {
    formatDate() {
      const date = new Date(this.task.dueDate);
      const now = Date.now();

      const isPassed = isBefore(date, now);
      if (!isPassed) {
        const diff = +date - now;
        if (diff < 86400000 && diff > 0) {
          this.dueStatus = 'is-due-soon';
        } else this.dueStatus = '';
      } else this.dueStatus = 'is-due-past';

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
      this.$emit('editTask', this.taskToEditPartial);
    },

    removeTask(taskId, groupId) {
      this.$emit('removeTask', taskId, groupId);
    },

    editTask(taskId) {
      this.isEditing = !this.isEditing;
      if (taskId === this.task.id) {
        this.updateHeigh();
        if (this.isEditing) this.$nextTick(() => this.$refs.textarea.focus());
      }
    },
    updateHeigh() {
      if (this.task.style.cover.style === 'background') {
        this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
      } else
        this.$refs.textarea.style.height =
          this.$refs.textarea.scrollHeight - this.$refs.textarea.scrollHeight / 3.5 + 'px';
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
      } else return '';
    },
    isCoverBcg() {
      if (this.task.style.cover.style === 'background') return true;
      else return false;
    },
    checklistStatus() {
      if (!this.task.checklist || !this.task.checklist.length) return;
      const length = this.task.checklist[0].todos.length;
      if (!this.task.checklist[0].todos || !length) {
        var done = [];
      } else done = this.task.checklist[0].todos.filter((todo) => todo.isDone);
      return `${done.length}/${length}`;
    },
    isChecklistDone() {
      // if (this.task.checklist[0].todos.length) {
      const done = this.task.checklist[0].todos.filter((todo) => todo.isDone);
      if (done.length === this.task.checklist[0].todos.length) return true;

      return '';
      // }
    },
    isDueCompleted() {
      return this.isDueComplete ? 'is-due-complete' : 'is-due-future';
    },
    isDuePassed() {
      return this.dueStatus;
    },
  },
  components: {
    iconBase,
  },
  created() {
    this.unsubscribe = eventBus.on('editTask', this.editTask);
  },
  unmounted() {
    this.unsubscribe();
  },
};
</script>
