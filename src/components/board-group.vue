<template>
  <section class="board-group">
    <div class="group-title">
      <div class="title-container">
        <input
          type="text"
          :class="{ isEditing: isEditing, mover: true }"
          v-model="group.title"
          @blur="editGroup(group)"
          @click="changeGroupTitle"
        />
      </div>
      <button @click="openEditModal" class="more-btn mover">
        <icon-base iconName="more"></icon-base>
      </button>
    </div>

    <div class="task-container">
      <ul>
        <draggable v-model="tasks" group="tasks" forceFallback="true">
          <li class="task-li" @click="openModalDetails(task.id)" v-for="task in group.tasks" :key="task.id">
            <button @click.stop="quickEdit($event, task)" class="edit-btn">
              <icon-base iconName="pencil"></icon-base>
            </button>

            <div v-if="task.style.cover.style === 'solid'" class="task-prev-cover">
              <div class="cover-clr" :style="'background-color:' + task.style.cover.color">
                <img class="cover-img" v-if="task.style.cover.type === 'img'" :src="task.style.cover.imgUrl" />
              </div>
            </div>

            <task-preview
              :style="
                task.style.cover.style === 'background'
                  ? `background-image: url(${task.style.cover.imgUrl}); background-color:${task.style.cover.color}`
                  : ''
              "
              :class="[
                task.style.cover.style === 'background' && task.style.cover.type === 'img' ? 'task-prev-bcg' : '',
                task.style.cover.style === 'background' && task.style.cover.type === 'color' ? 'task-prev-clr' : '',
              ]"
              :task="task"
              :group="group"
              @editTask="updateTask"
              @removeTask="removeTask"
              @toggleLabelsExpanded="toggleLabelsExpanded"
            ></task-preview>
            <span class="bcg-helper" v-if="task.style.cover.style === 'background'"></span>
          </li>
        </draggable>
      </ul>
      <div v-if="isNewTask" class="create-btn">
        <div class="new-task-container">
          <div class="textarea-wrapper">
            <resizable-textarea
              :value="taskTitle"
              @valueChange="editTaskTitle"
              @focusOut="isNewTask = false"
              :autofocus="true"
            />
          </div>
          <div class="buttons-container">
            <button @mousedown="addTask(group.id)" @touchstart="addTask(group.id)" class="add-card-btn">
              Add card
            </button>
            <button @click="isNewTask = false">
              <img src="../assets/icons/x.svg" alt="close form" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="create-btn">
      <div v-if="!isNewTask" class="add-task-container">
        <button class="add-task-btn" @click="createTask(group.id)">
          <icon-base iconName="+" />
          <span>Add a card</span>
        </button>
      </div>
    </div>
    <div @blur="openEditModal" v-if="isEditModal" class="group-edit-modal">
      <div class="modal-header">
        <h1>List actions</h1>
        <label @click="openEditModal">
          <icon-base iconName="x"></icon-base>
        </label>
      </div>
      <hr />
      <div class="modal-content">
        <div>
          <p @click="createTask(group.id)">Add card</p>
        </div>
        <p @click="removeGroup(group.id)">Delete this list</p>
      </div>
    </div>
  </section>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
import { eventBus } from '../services/eventBus.service.js';
import iconBase from './icon-base.vue';
import taskPreview from '../components/task-preview.vue';
import IconBase from './icon-base.vue';
import TaskPreview from '../components/task-preview.vue';
import resizableTextarea from './resizable-textarea.vue';

export default {
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
      title: this.group.title,
      taskTitle: '',
      isNewTask: false,
      isTaskDragged: false,
      isEditModal: false,
      isDrag: false,
      isEditingTask: false,
    };
  },
  created() {
    this.$store.commit({ type: 'setGroup', group: this.group });
    window.addEventListener('resize', this.onResize);
  },
  methods: {
    editTaskTitle(txt) {
      this.taskTitle = txt;
    },
    onResize() {
      if (this.isEditModal) this.isEditModal = false;
    },
    toggleLabelsExpanded() {
      this.$store.dispatch({
        type: 'toggleLabelsExpanded',
      });
    },
    openModalDetails(taskId) {
      this.$emit('onOpen', taskId, this.group.id);
    },
    openEditModal(ev) {
      this.isEditModal = !this.isEditModal;
    },
    closeEditModal(ev) {
      this.isEditModal = false;
    },
    editGroup(group) {
      group.title;
      this.$emit('editGroup', group);
      this.isEditing = false;
    },
    changeGroupTitle() {
      this.isEditing = true;
    },
    removeGroup(groupId) {
      this.$emit('removeGroup', groupId);
    },
    removeTask(taskId, groupId) {
      this.$emit('removeTask', taskId, groupId);
    },
    updateTask(taskPartial) {
      const groupId = this.group.id;
      this.$emit('updateTask', taskPartial, groupId);
    },
    createTask() {
      this.closeEditModal();
      this.isNewTask = !this.isNewTask;
    },
    addTask(groupId) {
      this.$emit('addTask', this.taskTitle, groupId);
      this.isNewTask = false;
      this.taskTitle = '';
    },
    quickEdit(ev, task) {
      const { left, top, width } = ev.target.closest('li').getBoundingClientRect();
      this.$emit('quickEdit', task, { left, top }, width);
    },
  },
  computed: {
    tasks: {
      get() {
        return this.group.tasks;
      },
      set(value) {
        this.$store.dispatch({
          type: 'dragTask',
          value,
          group: { ...this.group },
        });
      },
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize);
  },
  components: { taskPreview, iconBase, IconBase, draggable: VueDraggableNext, TaskPreview, resizableTextarea },
};
</script>
