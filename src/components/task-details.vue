<template>
  <section
    class="task-details"
    v-if="taskToEdit"
    @click.stop="isFocus = !isFocus"
  >
    <button @click="closeTaskDetails">
      <img
        src="../assets/icons/x.svg"
        alt="close"
      />
    </button>
    <div class="task-header-container">
      <div class="cover-container">
        <!-- <img src="../assets/imgs/background.jpg" alt="" /> -->
      </div>
      <div class="task-details-container">
        <icon-base
          class="card-header"
          iconName="cardB"
        />
        <textarea
          type="text"
          v-model="taskToEdit.title"
        ></textarea>
        <div class="info-in-group">
          <p>
            in list <span> {{ group.title }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="content-displayed">
        <div class="container">
          <div
            class="labels-for-display"
            v-if="taskToEdit.labels.length >= 1"
          >
            <h2>Labels</h2>
            <div class="labels-container">
              <div
                class="label"
                v-for="label in taskToEdit.labels"
                :key="label.id"
                :style="'background-color:' + label.color"
              >
                {{ label.title }}
              </div>
              <button
                class="add-btn"
                @click="toggleLabelsModal"
              >
                <icon-base iconName="plus" />
              </button>
            </div>
          </div>
          <div
            class="dueDate"
            v-if="taskToEdit.dueDate"
            @click="toggleCalendar"
          >
            <h2>Due date</h2>
            <span>{{ formatDate(taskToEdit.dueDate) }}
              <icon-base iconName="chevron-down" />
            </span>
          </div>
        </div>
        <description-details
          :taskToEdit="taskToEdit"
          @save="saveDesc"
        />
        <activity-details
          :task="taskToEdit"
          :user="loggedinUser"
          :isFocus="isFocus"
        />
      </div>
      <task-details-menu @openModal="openModal" />
      <div class="dynamic-cmp">
        <component
          :is="cmp"
          @openModal="openModal"
          :board="board"
          :task="taskToEdit"
          @saveDate="saveDate"
          @removeDate="removeDate"
          @addLabel="addLabel"
          :date="taskToEdit.dueDate"
          @closeCalendar="closeCalendar"
          @closeLabel="closeLabel"
        />
      </div>
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
import descriptionDetails from "./description-details.vue";
import activityDetails from "./activity-details.vue";
import iconBase from "./icon-base.vue";

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
      cmp: null,
      isFocus: true,
    };
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toDateString();
    },
    toggleCalendar() {
      if (this.cmp === null) {
        this.openModal("calendar-cmp");
      } else {
        this.closeLabel();
      }
    },
    toggleLabelsModal() {
      if (this.cmp === null) {
        this.openModal("label-cmp");
      } else {
        this.closeLabel();
      }
    },
    saveDesc(task) {
      this.$store.dispatch({
        type: "updateTask",
        taskPartial: task,
        groupId: this.groupId,
      });
    },
    openModal(type) {
      this.cmp = type;
    },
    closeCalendar() {
      this.cmp = null;
    },
    closeLabel() {
      this.cmp = null;
    },

    closeTaskDetails() {
      this.$emit("closeTaskDetails");
    },
    joinTask() {},
    makeChecklist() {},
    addAttachment() {},
    changeCover() {},
    copyTask() {},
    archiveTask() {},

    async saveDate(date) {
      this.cmp = null;
      this.taskToEdit.dueDate = date;
      try {
        this.$store.dispatch({
          type: "updateTask",
          taskPartial: this.taskToEdit,
          groupId: this.groupId,
        });
      } catch (err) {
        console.log(err);
      }
    },

    async removeDate() {
      this.cmp = null;
      this.taskToEdit.dueDate = null;
      try {
        this.$store.dispatch({
          type: "updateTask",
          taskPartial: this.taskToEdit,
          groupId: this.groupId,
        });
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
      await this.$store.dispatch({
        type: "updateTask",
        taskPartial: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    loggedinUser() {
      return this.$store.getters.user;
    },
  },
  components: {
    taskDetailsMenu,
    labelCmp,
    memberCmp,
    checklistCmp,
    calendarCmp,
    descriptionDetails,
    activityDetails,
    iconBase,
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
