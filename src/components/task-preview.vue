<template>
  <section class="task-preview" @click="openModalDetails">
    <div v-if="isCover" class="task-prev-cover" :style="coverStyle">
      <img class="cover-img" v-if="task.style.cover.type === 'img'" :src="task.style.cover.imgUrl" />
    </div>
    <div class="task-labels">
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
    <button @click.stop="editTask(task, group.id)" class="edit-btn">
    <icon-base iconName="pencil"></icon-base>
      <!-- <img src="../assets/icons/bx-pencil.svg" alt="edit" /> -->
    </button>
    <div class="task-extras">
      <div>
        <span v-if="task.dueDate" class="due-date">
          <icon-base iconName="clock" />
          {{ formatDate(this.task.dueDate) }}
        </span>
        <!-- <button @click.stop="removeTask(task.id, group.id)">
          <img src="../assets/icons/x.svg" alt="delete" />
        </button>-->
      </div>
      <div class="member-list">
        <img v-for="member in task.members" :key="member._id" :src="member.imgUrl" />
      </div>
    </div>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';
import IconBase from './icon-base.vue';
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
      taskCover: null
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
    labels() {
      return this.$store.getters.boardLabels.filter((label) => {
        if (!this.task.labelIds) return false;
        return this.task.labelIds.includes(label.id);
      });
    },
    isCover() {
      // console.log(this.task)
      if (!this.task.style.cover.type) return false
      return true
    },
    coverStyle() {
      console.log(this.task)
      if (this.task.style.cover.type === 'color') {
        // console.log(`background-color: ${this.task.style.cover.color}`)
        return `background-color: ${this.task.style.cover.color}; height: 32px`
      } 
      // else if (this.task.style.cover.type === 'img') {
      //   return `background-image: url(${this.task.style.cover.imgUrl}); max-height: 260px`
      // }
      else return '';
    }
  },
  components: {
    iconBase,
    IconBase
},
  created() {
    // this.taskCover = this.task.style.cover
  }
};
</script>
