<template>
  <section class="checklist-cmp">
    <header>
      <span>Add checklist</span>
      <!-- <button> -->
      <icon-base iconName="x"></icon-base>
      <!-- </button> -->
    </header>

    <div class="container">
      <form class="add-checklist">
        <label for="title" class="input-label">Title</label>
        <input type="text" id="title" placeholder="Checklist" />

        <label class="input-label">Copy items from…</label>

        <select @change="addTodos" v-model="todosToAdd">
          <optgroup>
            <option value=".">(none)</option>
          </optgroup>
          <optgroup v-for="check in checklists" :key="check.id" :label="check.taskTitle">
            <option :value="check.todos">{{ check.title }}</option>
          </optgroup>
        </select>
        <button>Add</button>
      </form>
    </div>
  </section>
</template>
<script>
import iconBase from '../icon-base.vue';

export default {
  data() {
    return {
      todosToAdd: '.',
    };
  },
  created() {
    this.$store.commit({ type: 'getChecklists' });
  },
  methods: {
    addTodos() {
      console.log(this.todosToAdd);
    },
  },
  computed: {
    checklists() {
      return this.$store.getters.checklists;
    },
  },
  components: { iconBase },
};
</script>
