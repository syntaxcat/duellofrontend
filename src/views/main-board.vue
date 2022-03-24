<template>
  <section class="main-board">
    <main-header />
    <board-header />
    <!-- <create-board @create="createBoard" /> -->

    <section class="groups-container" v-if="board">
      <draggable v-model="groups" group="groups" class="groups" handle=".mover">
        <div class="group" v-for="group in board.groups" :key="group.id">
          <board-group
            :group="JSON.parse(JSON.stringify(group))"
            @editGroup="editGroup"
            @removeGroup="removeGroup"
            @removeTask="removeTask"
            @updateTask="updateTask"
            @addTask="addTask"
            @onOpen="openModal"
          />
        </div>
      </draggable>
      <add-group @addGroup="addGroup" />
    </section>
    <task-details
      v-if="isOpenModal"
      :taskId="taskId"
      :groupId="groupId"
      :boardId="board._id"
      @closeTaskDetails="isOpenModal = !isOpenModal"
    />
  </section>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import boardHeader from "../components/board-header.vue";
import mainHeader from "../components/main-header.vue";
import boardGroup from "../components/board-group.vue";
import addGroup from "../components/add-group.vue";
import createBoard from "../components/create-board.vue";
import taskDetails from "../components/task-details.vue";
import TaskDetails from "../components/task-details.vue";

export default {
  data() {
    return {
      isOpenModal: false,
      taskId: null,
      groupId: null,
    };
  },
  async created() {
    const board = await this.$store.dispatch({
      type: "loadBoards",
      filterBy: { boardId: this.$route.params.boardId },
    });
  },
  methods: {
    openModal(taskId, groupId) {
      this.isOpenModal = true;
      this.taskId = taskId;
      this.groupId = groupId;
    },
    addGroup(title) {
      this.$store.dispatch({
        type: "addGroup",
        title: title,
        boardId: this.board._id,
      });
    },
    removeGroup(groupId) {
      this.$store.dispatch({ type: "removeGroup", groupId });
    },
    editGroup(newGroup) {
      this.$store.dispatch({ type: "updateGroup", newGroup });
    },
    removeTask(taskId, groupId) {
      this.$store.dispatch({ type: "removeTask", taskId, groupId });
    },
    updateTask(task, groupId) {
      this.$store.dispatch({ type: "updateTask", task, groupId });
    },
    addTask(taskTitle, groupId, boardId) {
      this.$store.dispatch({ type: "addTask", taskTitle, groupId, boardId });
    },
    async createBoard(newBoard) {
      const boardId = await this.$store.dispatch({
        type: "createBoard",
        board: newBoard,
      });
      this.$router.push({ path: `/board/${boardId}` });
    },
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
    groups: {
      get() {
        return this.$store.getters.groups;
      },
      set(value) {
        this.$store.dispatch({ type: "drag", value });
      },
    },
  },
  components: {
    boardHeader,
    mainHeader,
    boardGroup,
    addGroup,
    taskDetails,
    draggable: VueDraggableNext,
    createBoard,
    TaskDetails,
  },
};
</script>

<style></style>
