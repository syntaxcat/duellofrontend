<template>
  <section class="task-details-menu">

    <div class="task-menu">
      <div class="task-menu-group">
        <h2>Suggested</h2>
        <button @click="joinTask">
          <img
            src="../assets/icons/bx-user.svg"
            alt="user"
          />
          Join
        </button>
      </div>

      <div class="task-menu-group">
        <h2>Add to card</h2>
        <button @click="openModal('member-cmp')">
          <img
            src="../assets/icons/users.svg"
            alt="users"
          />
          Members
        </button>
        <button @click="openModal('label-cmp')">
          <img
            src="../assets/icons/tag.svg"
            alt="label"
          />
          Labels
        </button>
        <button @click="openModal('checklist-cmp')">
          <img
            src="../assets/icons/check-square.svg"
            alt="checklist"
          />
          Checklist
        </button>
        <button @click="openModal('calendar-cmp')">
          <img
            src="../assets/icons/bx-time-five.svg"
            alt="clock"
          />
          Dates
        </button>
        <button @click="openModal('attachment-cmp')">
          <img
            src="../assets/icons/paperclip.svg"
            alt="clip"
          />
          Attachment
        </button>
        <button @click="openModal('cover-cmp')">
          <img
            src="../assets/icons/bxs-dock-bottom.svg"
            alt="cover"
          />
          Cover
        </button>
      </div>

      <div class="task-menu-group">
        <h2>Actions</h2>
        <button @click="copyTask">
          <img
            src="../assets/icons/bx-copy.svg"
            alt="duplicate"
          />
          Copy
        </button>
        <button @click="archiveTask">
          <img
            src="../assets/icons/bx-box.svg"
            alt="archive"
          />
          Archive
        </button>
      </div>
    </div>

  </section>
</template>

<script>
// import { taskService } from "../services/task.service";

export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    openModal(type) {
      this.$emit("openModal", type);
    },
    //   copyTask() {},
    //   archiveTask() {},
  },
  computed: {},
  components: {},
};
</script>
