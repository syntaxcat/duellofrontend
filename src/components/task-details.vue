<template>
  <section class="task-details" v-if="taskToEdit">
    <button @click="closeTaskDetails">
      <img src="../assets/icons/x.svg" alt="close" />
    </button>
    <div class="task-header-container">
      <div class="cover-container">
        <!-- <img src="../assets/imgs/background.jpg" alt="" /> -->
      </div>
      <div class="task-details-container">
        <img src="../assets/icons/bxs-dock-bottom.svg" alt="" />
        <textarea type="text" v-model="taskToEdit.title"></textarea>
        <div class="info-in-group">
          <p>in list {{ group.title }}</p>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="content-displayed">
        <div class="dueDate" v-if="taskToEdit.dueDate">
          {{taskToEdit.dueDate}}
        </div>
      </div>
      <task-details-menu @openModal="openModal" />
      <!-- <component
        @addLabel="addLabel"
        class="dynamic-details"
        :board="board"
        :is="'label-cmp'"
      /> -->
      <!-- <task-details-menu @openModal="openModal" /> -->
      <component :is="'calendar-cmp'" @saveDate="saveDate" />
    </div>
  </section>
</template>

<script>
  import { taskService } from "../services/task.service";
  import taskDetailsMenu from "../components/task-details-menu.vue";
  import labelCmp from "./dynamic-components/label-cmp.vue";
  import memberCmp from "./dynamic-components/member-cmp.vue";
  import checklistCmp from "./dynamic-components/checklist-cmp.vue";
  import calendarCmp from "./dynamic-components/calendar-cmp.vue";

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
        savedDate: null,
      };
    },
    methods: {
      openModal(type) {},
      closeTaskDetails() {
        this.$emit("closeTaskDetails");
      },
      joinTask() {},
      changeLabel() {},
      makeChecklist() {},
      addDate() {},
      addAttachment() {},
      changeCover() {},
      copyTask() {},
      archiveTask() {},

      async saveDate(date) {
        this.taskToEdit.dueDate = date;
        try {
          this.$store.dispatch({ type: "updateTask", task: this.taskToEdit, groupId : this.groupId});
        } catch (err) {
          console.log(err);
        }
      },
      async addLabel(label) {
        const idx = this.taskToEdit.labels.findIndex(
          (lbl) => lbl.id === label.id
        );
        if (idx === -1) {
          this.taskToEdit.labels.unshift(label);
        } else {
          this.taskToEdit.labels.splice(idx, 1);
        }
        const task = await this.$store.dispatch({
          type: "updateTask",
          task: JSON.parse(JSON.stringify(this.taskToEdit)),
          groupId: this.groupId,
        });
        this.closeTaskDetails();
      },
    },
    computed: {
      board() {
        return this.$store.getters.board;
      },
    },
    components: {
      taskDetailsMenu,
      labelCmp,
      memberCmp,
      checklistCmp,
      calendarCmp,
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
