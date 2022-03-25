<template>
  <section class="task-details-menu">
      
      <div class="task-menu">
        <h2>Suggested</h2>
        <button @click="joinTask">
          <img src="../assets/icons/bx-user.svg" alt="user" />
          Join
        </button>
        <h2>Add to card</h2>
        <button @click="addMembers">
          <img src="../assets/icons/users.svg" alt="users" />
          Members
        </button>
        <button @click="changeLabel">
          <img src="../assets/icons/tag.svg" alt="label" />
          Labels
        </button>
        <button @click="makeChecklist">
          <img src="../assets/icons/check-square.svg" alt="checklist" />
          Checklist
        </button>
        <button @click="addDate">
          <img src="../assets/icons/bx-time-five.svg" alt="clock" />
          Dates
        </button>
        <button @click="addAttachment">
          <img src="../assets/icons/paperclip.svg" alt="clip" />
          Attachment
        </button>
        <button @click="changeCover">
          <img src="../assets/icons/bxs-dock-bottom.svg" alt="cover" />
          Cover
        </button>
      </div>
      <div class="actions-menu">
        <h2>Actions</h2>
        <button @click="copyTask">
          <img src="../assets/icons/bx-copy.svg" alt="duplicate" />
          Copy
        </button>
        <button @click="archiveTask">
          <img src="../assets/icons/bx-box.svg" alt="archive" />
          Archive
        </button>
      </div>
 
  </section>
</template>

<script>
// import { taskService } from "../services/task.service";

  export default {
      props:{
          
      },
    data() {
      return {
         
      };
    },
    methods: {
      joinTask() {},
      addMembers(){},
      changeLabel() {},
      makeChecklist() {},
      addDate() {},
      addAttachment() {},
      changeCover() {},
    //   copyTask() {},
    //   archiveTask() {},
    },
    computed: {},
    components: {},
  };
</script>
