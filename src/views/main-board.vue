<template>
  <section class="main-board">
    <main-header />
    <board-header />

    <section class="groups-container" v-if="board">
      <div class="group" v-for="group in board.groups" :key="group.id">
        <board-group
          :group="group"
          @groupTitle="groupTitle"
          @removeGroup="removeGroup(group.id)"
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
        type: "loadBoard",
        filterBy: { boardId: this.$route.params.boardId },
      });
    },
    methods: {
      addGroup(title) {
        this.$store.dispatch({ type: "addGroup", title });
      },
      removeGroup(groupId) {
        this.$store.dispatch({ type: "removeGroup", groupId });
      },
      groupTitle(groupToUpdate) {
        groupToUpdate.boardId = this.board._id;
        this.$store.dispatch({ type: "groupTitle", groupToUpdate });
      },
    },
    computed: {
      board() {
        return this.$store.getters.board
      }
    },
    components: { boardHeader, mainHeader, boardGroup, addGroup },
  };
</script>

<style>
</style>
