<template>
  <section class="activity-cmp">
    <img :src="info.byMember.imgUrl" alt="user" />
    <div>
      <div class="activity-header">
        <span class="member-name">{{ info.byMember.fullname }}</span>
        <span class="action"> {{ info.action }}</span>
      </div>
      <span class="time">{{ info.createdAt }}</span>
    </div>
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
