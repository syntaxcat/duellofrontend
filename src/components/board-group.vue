<template>
  <section class="board-group">
      <h1>{{group.title}}</h1>
  </section>
</template>

<script>
export default {
  props:{
    group:{
      type: Object,
      required: true
    }
  }

}
</script>

<style>

</style>