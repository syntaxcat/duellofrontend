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
          <img :src="member.imgUrl"/>
          <div>
            <span>{{ member.fullname }}</span>
          </div>
      </li>
    </ul>
  </section>
</template>
<script>
import iconBase from "../icon-base.vue";
export default {
  props: {
    board:{
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      members: this.board.members
    };
  },
  methods: {
        close() {
      this.$emit('closeLabel');
    },
    addMember(member){
      this.$emit('addMember', member)
    }
  },
  components:{iconBase}
};
</script>
