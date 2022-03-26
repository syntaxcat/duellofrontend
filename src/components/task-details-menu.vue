<template>
  <section class="task-details-menu">
    <div class="task-menu">
      <div v-if="!isMember" class="task-menu-group">
        <h2>Suggested</h2>
        <button @click="joinTask">
          <icon-base class="icon-fill" iconName="user" />Join
        </button>
      </div>

      <div class="task-menu-group">
        <h2>Add to card</h2>
        <button @click="openModal('member-cmp')">
          <icon-base class="icon-color" iconName="users" />Members
        </button>
        <button @click="openModal('label-cmp')">
          <icon-base class="icon-color" iconName="labels" />Labels
        </button>
        <button @click="openModal('checklist-cmp')">
          <icon-base class="icon-color" iconName="check-box" />Checklist
        </button>
        <button @click="openModal('calendar-cmp')">
          <icon-base class="icon-color" iconName="clock" />Dates
        </button>
        <button @click="openModal('attachment-cmp')">
          <icon-base class="icon-color" iconName="attachment" />Attachment
        </button>
        <button @click="openModal('cover-cmp')">
          <icon-base class="icon-fill" iconName="cover" />Cover
        </button>
      </div>

      <div class="task-menu-group">
        <h2>Actions</h2>
        <button @click="copyTask">
          <icon-base class="icon-fill" iconName="copy" />Copy
        </button>
        <button @click="archiveTask">
          <icon-base class="icon-fill" iconName="archive" />Delete
        </button>
      </div>
    </div>
  </section>
</template>

<script>
// import { taskService } from "../services/task.service";
import iconBase from "./icon-base.vue";
export default {
  props: {
    isMember: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    openModal(type) {
      this.$emit('openModal', type);
    },
    joinTask() {
      // console.log('join task')
      this.$emit('joinTask');
    },
    //   copyTask() {},
    //   archiveTask() {},
  },
  computed: {},
  components: { iconBase },
};
</script>
