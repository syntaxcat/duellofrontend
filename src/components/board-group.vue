<template>
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
        <button class="more-btn mover">
          <icon-base iconName="more"></icon-base>
        </button>
      </div>
      <div class="task-container">
        <ul>
          <draggable v-model="tasks" group="tasks" @change="log">
            <li v-for="task in group.tasks" :key="task.id">
              <task-preview
                :task="task"
                :group="group"
                @editTask="updateTask"
                @removeTask="removeTask"
                @onOpen="openModalDetails(task.id)"
              />
            </li>
          </draggable>
        </ul>
      </div>
      <div>
        <div v-if="isNewTask">
          <textarea v-model="taskTitle" ref="taskInput"></textarea>
          <button @click="addTask(group.id)">Add Card</button>
        </div>
        <button v-else class="add-task-btn" @click="createTask(group.id)">
          <!-- <button class="add-task-btn" @click="createTask(group.id)"> -->
          <icon-base iconName="+"></icon-base>
          <span>Add Card</span>
        </button>
      </div>
      <button @click="removeGroup(group.id)">Delete</button>
    </section>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import iconBase from "./icon-base.vue";
import taskPreview from "../components/task-preview.vue";
import IconBase from "./icon-base.vue";

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
      taskTitle: "",
      isNewTask: false,
      isTaskDragged: false,
    };
  },
  created() {
    this.$store.commit({ type: "setGroup", group: this.group });
  },
  methods: {
    openModalDetails(taskId) {
      this.$emit("onOpen", taskId, this.group.id);
    },
    editGroup(group) {
      group.title;
      this.$emit("editGroup", group);
      this.isEditing = false;
    },
    changeGroupTitle() {
      this.isEditing = true;
    },
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
    },
    removeTask(taskId, groupId) {
      this.$emit("removeTask", taskId, groupId);
    },
    updateTask(task) {
      const groupId = this.group.id;
      this.$emit("updateTask", task, groupId);
    },
    createTask() {
      this.isNewTask = true;
    },
    addTask(groupId) {
      this.$emit("addTask", this.taskTitle, groupId);
      this.isNewTask = false;
      this.taskTitle = "";
    },
    log(evt) {
      console.log(evt);
    },
  },
  computed: {
    tasks: {
      get() {
        return this.group.tasks;
      },
      set(value) {
        setTimeout(() => {
          this.$store.dispatch({
            type: "dragTask",
            value,
            group: { ...this.group },
          });
        }, 2);
      },
    },
  },
  components: { taskPreview, iconBase, IconBase, draggable: VueDraggableNext },
};
</script>
