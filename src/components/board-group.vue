<template>
  <div class="board-group-container">
    <section class="board-group">
      <div class="group-title">
        <div class="title-container">
          <input
            type="text"
            :class="{ isEditing: isEditing }"
            v-model="group.title"
            @blur="editGroup(group)"
            @click="changeGroupTitle"
          />
        </div>
        <button class="more-btn">
          <icon-base iconName="more"></icon-base>
        </button>
      </div>
      <div class="task-container">
        <ul>
          <li v-for="task in group.tasks" :key="task.id">
            <task-preview
              :task="task"
              :group="group"
              @editTask="updateTask"
              @removeTask="removeTask"
            />
          </li>
        </ul>
      </div>
      <div class="add-task-btn">
        <div v-if="isNewTask">
          <input type="text" v-model="taskTitle" ref="taskInput" />
          <button @click="addTask(group.id)">Add</button>
        </div>
        <button v-else @click="createTask(group.id)">
          <icon-base iconName="+"></icon-base>Add Card
        </button>
      </div>
      <!-- <button @click="removeGroup(group.id)">Delete</button> -->
    </section>
  </div>
</template>

<script>
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
    };
  },
  methods: {
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
  },
  components: { taskPreview, iconBase, IconBase },
};
</script>
