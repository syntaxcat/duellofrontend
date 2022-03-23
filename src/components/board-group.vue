<template>
<div class="board-group-container">
  
  <section class="board-group">
    <div class="group-title">
      <input
        type="text"
        ref="myInput"
        v-model="group.title"
        v-if="isEditing"
        @blur="editGroup(group)"
        @click="editGroup"
      />
      <div v-else @click="changeGroup">{{ group.title }}</div>
    </div>

    <ul>
      <li v-for="task in group.tasks" :key="task.id">
        <button @click="removeTask(task.id, group.id)">X</button>
        <task-preview :task="task" @editTask="updateTask" />
      </li>
    </ul>
    <div v-if="isNewTask">
      <input type="text" v-model="taskTitle" ref="taskInput" />
      <button @click="addTask(group.id)">Add</button>
    </div>
    <button v-else @click="createTask(group.id)">Add task</button>
    <button @click="removeGroup(group.id)">Delete</button>
  </section>
</div>
</template>

<script>
import taskPreview from "../components/task-preview.vue";

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
      isNewTask: false
    };
  },
  methods: {
    editGroup(group) {
      group.title
      this.$emit("editGroup", group);
      this.isEditing = false
    },
    changeGroup() {
      this.isEditing = true
      this.$nextTick(() => this.$refs.myInput.focus());
    },
    removeGroup(groupId) {
      this.$emit("removeGroup", groupId);
    },
    removeTask(taskId, groupId) {
      this.$emit("removeTask", taskId, groupId);
    },
    updateTask(task) {
      this.$emit("updateTask", task, this.group.id);
    },
    createTask() {
      this.isNewTask = true
    },
    addTask(groupId) {
      this.$emit('addTask', this.taskTitle, groupId)
      this.isNewTask = false
      this.taskTitle = ''
    }
  },
  components: { taskPreview },
};
</script>
