<template>
  <section class="task-details" v-if="taskToEdit">
    <button @click="closeTaskDetails">
      <img src="../assets/icons/x.svg" alt="close" />
    </button>
    <div class="task-header-container">
      <!-- <img src="../assets/icons/" alt=""> -->
      <input type="text" v-model="taskToEdit.title" />
      <div class="info-in-group">
        <p>in list {{ group.title }}</p>
      </div>
    </div>
    <div class="main-container">
      <task-details-menu @openModal="openModal" />
      <component @addLabel="addLabel" class="dynamic-details" :board="board" :is="'label-cmp'" />
    </div>
  </section>
</template>

<script>
  import { taskService } from "../services/task.service";
  import taskDetailsMenu from "../components/task-details-menu.vue";
  import labelCmp from "./dynamic-components/label-cmp.vue";
  import memberCmp from "./dynamic-components/member-cmp.vue";
  import checklistCmp from "./dynamic-components/checklist-cmp.vue"

export default {
  props: {
    taskId: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
    boardId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      taskToEdit: null,
      group: null,
    };
  },
  methods: {
    // openModal(type) {

    // },

    closeTaskDetails() {
      this.$emit("closeTaskDetails");
    },
    joinTask() { },
    changeLabel() { },
    makeChecklist() { },
    addDate() { },
    addAttachment() { },
    changeCover() { },
    copyTask() { },
    archiveTask() { },

    async addLabel(label) {
      const idx = this.taskToEdit.labels.findIndex(lbl => lbl.id === label.id)
      console.log(idx)
      if(idx === -1){
        this.taskToEdit.labels.unshift(label)
      }else{
        this.taskToEdit.labels.splice(idx,1)
      }
        const task = await this.$store.dispatch({ type: 'updateTask', task: JSON.parse(JSON.stringify(this.taskToEdit)), groupId: this.groupId })
        console.log(task)
        this.closeTaskDetails()
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    }
  },
  components: {
    taskDetailsMenu,
    labelCmp,
    memberCmp,
  },
  async created() {
    const res = await taskService.getById(
      this.taskId,
      this.groupId,
      this.boardId
    );
    this.taskToEdit = { ...res.task };
    this.group = { ...res.group };
  },
};
</script>
