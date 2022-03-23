<template>
  <section class="main-board">
    <main-header />
    <board-header />

    <section class="groups-container" v-if="board">
      <div class="group" v-for="group in board.groups" :key="group.id">
        <board-group :group="group" />
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
      board: null,
    };
  },
  async created() {
    const board = await this.$store.dispatch({ type: "loadBoard" });
    this.board = board;
    console.log(this.board);
  },
  computed: {},
  methods: {
     addGroup(title){
      this.$store.dispatch({type: 'addGroup', title})
    }
  },
  components: { boardHeader, mainHeader, boardGroup, addGroup },
};
</script>

<style>
.groups-container {
  display: flex;
  width: 100%;
}
</style>
