<template>
  <section class="members-cmp">
    <header>
      <h2>Members</h2>
      <button @click="close">
        <icon-base iconName="x" />
      </button>
    </header>
    <input type="search" placeholder="Search members..." />
    <h2>Board members</h2>
    <ul class="memeber-list">
      <li v-for="member in members" :key="member.id" @click="addMember(member)">
        <img :src="member.imgUrl" />
        <div>
          <span>{{ member.fullname }}</span>
        </div>
        <label v-if="test(member._id)"><icon-base iconName="check" /></label>
      </li>
    </ul>
  </section>
</template>
<script>
import iconBase from '../icon-base.vue';
import IconBase from '../icon-base.vue';
export default {
  props: {
    board: {
      type: Object,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      members: this.board.members,
    };
  },
  methods: {
    close() {
      this.$emit('closeLabel');
    },
    addMember(member) {
      console.log('adding member...');
      this.$emit('addMember', member);
    },
    isMemberSelected(memberId) {
      return this.task.members.some((member) => member.id === memberId);
    },
    test(memberId) {
      return this.task.members.some((member) => member._id === memberId);
    },
  },
  components: { iconBase, IconBase },
};
</script>
