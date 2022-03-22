<template>
  <section class="main-board">
    <mainHeader />
    <boardHeader />
    <section class="groups-container"></section>
  </section>
</template>

<script>
  import boardHeader from "../components/board-header.vue";
  import mainHeader from "../components/main-header.vue";

  export default {
    components: { boardHeader, mainHeader },
  };
</script>
