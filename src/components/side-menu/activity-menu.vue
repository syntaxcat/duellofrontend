<template>
  <section class="activity-menu main-container">
    <div class="controls">
      <a :class="['control-item']" @click="changeList">All</a>
      <a :class="['control-item']" @click="changeList">Comments</a>
    </div>

    <!-- <div class="list"> -->
    <div class="activity-list">
      <div v-for="content in list" :key="content.id">
        <component :is="content.type" :comment="content" :info="content" :isMenu="true" />
      </div>
    </div>
    <!-- </div> -->
  </section>
</template>

<script>
import commentCmp from '../comment-cmp.vue';
import activityCmp from '../dynamic-components/activity-cmp.vue';

export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    changeList() {},
  },
  components: { commentCmp, activityCmp },
};
</script>

<style></style>
