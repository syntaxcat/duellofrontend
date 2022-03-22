<template>
  <section class="main-board">
    <mainHeader />
    <header>Board header</header>
    <section class="groups-container"></section>
  </section>
</template>

<script>
  import mainHeader from "../components/main-header.vue";

  export default {
    components: { mainHeader },
  };
</script>
