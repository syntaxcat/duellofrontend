<template>
  <section class="board-group">
    <div class="board-group-container">
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
            <draggable v-model="tasks" group="tasks" @change="log" v-bind="{ ghostClass: 'groupGhost' }">
              <li @click="openModalDetails(task.id)" v-for="task in group.tasks" :key="task.id">
                <button @click.stop="editTask(task.id)" class="edit-btn">
                  <icon-base iconName="pencil"></icon-base>
                  <!-- <img src="../assets/icons/bx-pencil.svg" alt="edit" /> -->
                </button>

                <div v-if="task.style.cover.style === 'solid'" class="task-prev-cover">
                  <div
                    class="cover-clr"
                    :style="'background-color:' + task.style.cover.color"
                  >
                  <img
                    class="cover-img"
                    v-if="task.style.cover.type === 'img'"
                    :src="task.style.cover.imgUrl"
                  />
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
        </div>

        <div class="create-btn">
          <div v-if="isNewTask" class="new-task-container">
            <textarea class="new-task" v-model="taskTitle" ref="taskInput" @blur="isNewTask = false"></textarea>
            <div class="buttons-container">
              <button @mousedown="addTask(group.id)" @touchstart="addTask(group.id)" class="add-card-btn">
                Add card
              </button>
              <button @click="isNewTask = false">
                <img src="../assets/icons/x.svg" alt="close form" />
              </button>
            </div>
          </div>

          <div v-else class="add-task-container">
            <button class="add-task-btn" @click="createTask(group.id)">
              <icon-base iconName="+" />
              <span>Add a card</span>
            </button>
          </div>
        </div>
      </section>
    </div>
    <div
      @blur="openEditModal"
      v-if="isEditModal"
      class="group-edit-modal"
      :style="{ position: 'absolute', top: yPos + 20 + 'px', left: xPos / 1.6 + 'px' }"
    >
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
          <p>Copy list...</p>
          <p>Move list...</p>
          <p>Watch</p>
        </div>
        <hr />
        <p>Sort by</p>
        <hr />
        <div>
          <h3>Automation</h3>
          <p>When a card is added to the list...</p>
          <p>Every day, sort list by...</p>
          <p>Every Monday, sort list by...</p>
          <p>Create costume rule</p>
        </div>
        <hr />
        <div>
          <p>Move all card in this list...</p>
          <p>Delete all cards in this list...</p>
        </div>
        <hr />
        <p @click="removeGroup(group.id)">Delete this list</p>
      </div>
    </div>
  </section>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
import iconBase from './icon-base.vue';
import taskPreview from '../components/task-preview.vue';
import IconBase from './icon-base.vue';
import { eventBus } from '../services/eventBus.service.js';
import TaskPreview from '../components/task-preview.vue';

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
      xPos: null,
      yPos: null,
      isDrag: false,
      isEditingTask: false,
    };
  },
  created() {
    this.$store.commit({ type: 'setGroup', group: this.group });
  },
  methods: {
    updateHeigh() {
      this.$refs.taskInput.style.height = this.$refs.taskInput.scrollHeight + 'px';
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
      this.xPos = ev.clientX;
      this.yPos = ev.clientY;
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
    log(evt) {
      console.log(evt);
      this.isDrag = !this.isDrag;
    },
    editTask(taskId) {
      eventBus.emit('editTask', taskId);
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
      dragOptions() {
        return this.$store.getters.dragOptions;
      },
    },
  },
  updated() {
    if (this.isNewTask) {
      this.$refs.taskInput.focus();
    }
  },
  watch: {
    taskTitle() {
      this.updateHeigh();
    },
  },
  components: { taskPreview, iconBase, IconBase, draggable: VueDraggableNext, TaskPreview },
};
</script>
