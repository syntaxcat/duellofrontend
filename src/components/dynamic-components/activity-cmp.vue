<template>
  <section class="activity-cmp">
    <img :src="info.byMember.imgUrl" alt="user" />
    <div>
      <div class="activity-header">
        <span class="member-name">{{ info.byMember.fullname }}</span>
        <span class="action"> {{ info.action }}</span>
      </div>
      <span class="time">{{ createdAt }}</span>
    </div>
  </section>
</template>

<script>
import { format, compareAsc } from 'date-fns';

export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {
    createdAt() {
      return formatDistance(subDays(this.info.createdAt), Date.now(), { addSuffix: true });
    },
  },
};
</script>
