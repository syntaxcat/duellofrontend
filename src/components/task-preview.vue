<template>
  <section class="task-preview">
    {{ task.title }}
  </section>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      
    }
  },
  methods:{},
  computed:{}
};
</script>

<style></style>
