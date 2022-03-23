<template>
  <section class="board-group">
    <div class="group-title">
      <input
        type="text"
        ref="myInput"
        v-model="title"
        v-if="isEditing"
        @blur="edit(group.id)"
      />
      <div v-if="!isEditing" @click="edit">{{ group.title }}</div>
    </div>

    <ul>
      <li v-for="task in group.tasks" :key="task.id">
        <task-preview :task="task" />
      </li>
    </ul>
    <button>Add task</button>
    <button @click="removeGroup(group.id)">Delete</button>
  </section>
</template>

<script>
  import taskPreview from "../components/task-preview.vue";

  export default {
    props: {
      group: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        isEditing: false,
        title: this.group.title,
      };
    },
    methods: {
      edit(groupId) {
        this.isEditing = !this.isEditing;
        if (this.isEditing) this.$nextTick(() => this.$refs.myInput.focus());

        if (this.title !== this.group.title)
          this.$emit("groupTitle", { title: this.title, id: groupId });
      },
      removeGroup(groupId) {
        this.$emit("removeGroup", groupId);
      },
    },
      components: { taskPreview },
  };
</script>

<style>
</style>
