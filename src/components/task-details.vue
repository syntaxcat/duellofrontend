<template>
  <section
    class="task-details"
    v-if="taskToEdit"
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
        <img
          src="../assets/icons/bxs-dock-bottom.svg"
          alt=""
        />
        <textarea
          type="text"
          v-model="taskToEdit.title"
        ></textarea>
        <div class="info-in-group">
          <p>in list {{ group.title }}</p>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="content-displayed">
        <div class="container">
          <div
            class="dueDate"
            v-if="taskToEdit.dueDate"
          >
            {{ taskToEdit.dueDate }}
          </div>
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
                :style="'background-color:'+label.color"
              >{{ label.title }}

              </div>
            </div>
          </div>
        </div>

        <div class="description">
          <div class="header">
            <img src="../assets/icons/align-left.svg" />
            <h3>Description</h3>
          </div>
          <div class="description-content">
            <div
              class="fake-textarea"
              v-if="!addDescription && !taskToEdit.description"
              @click="addDesc"
            >
              Add a more detailed description...
            </div>
            <div
              class="fake-textarea description"
              v-else-if="!addDescription && taskToEdit.description"
              @click="addDesc"
            >
              {{ taskToEdit.description }}
            </div>

            <div
              class="real-textarea"
              v-else
            >
              <textarea
                ref="addDesc"
                type="text"
                v-model="taskToEdit.description"
                placeholder="Add a more detailed description..."
              ></textarea>

              <div class="actions">
                <button
                  class="save-description"
                  @click="saveDesc"
                >Save</button>
                <button class="close-btn">
                  <img
                    src="../assets/icons/x.svg"
                    alt="close"
                    @click="addDescription = !addDescription"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <task-details-menu @openModal="openModal" />
      <div class="dynamic-cmp">
        <component
          :is="cmp"
          @openModal="openModal"
          :board="board"
          :task="taskToEdit"
          @saveDate="saveDate"
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
      addDescription: false,
    };
  },
  methods: {
    saveDesc() {
      this.$store.dispatch({
        type: "updateTask",
        task: { ...this.taskToEdit },
        groupId: this.groupId,
      });
      this.addDescription = !this.addDescription;
    },
    addDesc() {
      this.addDescription = !this.addDescription;
      this.$nextTick(() => this.$refs.addDesc.focus());
    },
    openModal(type) {
      console.log(type);
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
          task: this.taskToEdit,
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
      const task = await this.$store.dispatch({
        type: "updateTask",
        task: JSON.parse(JSON.stringify(this.taskToEdit)),
        groupId: this.groupId,
      });
      // this.closeTaskDetails();
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
