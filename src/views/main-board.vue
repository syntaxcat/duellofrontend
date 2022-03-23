<template>
  <section class="main-board">
    <main-header />
    <board-header />

    <section class="groups-container" v-if="board">
      <div class="group" v-for="group in board.groups" :key="group.id">
        <board-group
          :group="JSON.parse(JSON.stringify(group))"
          @editGroup="editGroup"
          @removeGroup="removeGroup"
          @removeTask="removeTask"
          @updateTask="updateTask"
          @addTask="addTask"
        />
      </div>
      <add-group @addGroup="addGroup" />
    </section>
  </section>
</template>

<script>
import boardHeader from "../components/board-header.vue";
import mainHeader from "../components/main-header.vue";
import boardGroup from "../components/board-group.vue";
import addGroup from "../components/add-group.vue";

export default {
  data() {
    return {
    };
  },
  async created() {
    const board = await this.$store.dispatch({
      type: "loadBoards",
      filterBy: { boardId: this.$route.params.boardId },
    });
  },
  computed: {},
  methods: {
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
      // groupToUpdate.boardId = this.board._id;
      this.$store.dispatch({ type: "updateGroup", newGroup });
    },
    removeTask(taskId, groupId) {
      this.$store.dispatch({ type: "removeTask", taskId, groupId });
    },
    updateTask(task, groupId) {
      this.$store.dispatch({ type: "updateTask", task, groupId });
    },
    addTask(taskTitle, groupId, boardId) {
      this.$store.dispatch({ type: 'addTask', taskTitle, groupId, boardId })
    }
  },
  computed: {
    board() {
      return this.$store.getters.board;
    },
  },
  components: { boardHeader, mainHeader, boardGroup, addGroup },
};
</script>

<style></style>
