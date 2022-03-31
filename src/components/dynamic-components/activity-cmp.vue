<template>
  <section class="activity">
    <!-- <img :src="info.byMember.imgUrl" alt="user" /> -->

    <div class="activity-header">
      <!-- <span>{{ info.byMember.fullname }}</span> -->
      <span class="action">{{ info.action }}</span>
    </div>
    <!-- <span>{{ info.createdAt }}</span> -->
  </section>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {},
};
</script>
