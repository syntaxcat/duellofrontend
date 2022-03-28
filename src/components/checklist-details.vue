<template>
  <section class="checklist-details" v-if="checklist">
    <div class="header">
      <icon-base class="checklist-icon" iconName="checklist" />
      <div class="container">
        <h3>{{ checklist.title }}</h3>
        <div>
          <button @click.stop="show = !show">filteredTodos</button>
          <button @click.stop="deleteChecklist">Delete</button>
        </div>
      </div>
      <div class="progress-bar">
        <span class="percent">{{ percent }}%</span>

        <k-progress class="bar" :percent="percent" color="#5ba4cf" :line-height="8" :show-text="false"></k-progress>
      </div>
    </div>

    <div class="todos-container">
      <div class="checklist-item" v-for="todo in checklist.todos" :key="todo.id">
        <div class="checkbox" :class="{ complete: todo.isDone }">
          <span>
            <icon-base iconName="check" :class="{ checked: todo.isDone }" />
          </span>
        </div>

        <div class="todo-details">
          <div class="text-and-controls">
            <span :class="{ done: todo.isDone }">{{ todo.title }}</span>
            <div class="todo-controls">
              <div class="todo-controller" @click="log">
                <button>
                  <icon-base iconName="trello-clock" />
                </button>
              </div>
              <div class="todo-controller" @click="log">
                <button class="round">
                  <icon-base iconName="add-member" />
                </button>
              </div>
              <div class="todo-controller" @click="log">
                <button class="empty">
                  <icon-base iconName="more" />
                </button>
              </div>
            </div>
          </div>

          <div class="edit-todo"></div>
        </div>
      </div>
    </div>

    <div class="add-todo">
      <button v-if="!isAdd" @click="isAdd = !isAdd">Add an item</button>
      <textarea placeholder="Add an item" v-if="isAdd"></textarea>

      <div class="add-controls" v-if="isAdd">

        <div class="container">
          <button class="add-btn" @click.stop="save">Add</button>
          <icon-base class="close-btn" iconName="x" @click="isAdd = !isAdd" />
        </div>

        <div class="actions">
          <span>
            <icon-base iconName="add-member" />
            Assign
          </span>

          <span>
            <icon-base iconName="trello-clock" />
            Due date
          </span>

          <icon-base class="option" @click="log" iconName="mention" />
          <icon-base class="option" @click="log" iconName="emoji" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import iconBase from './icon-base.vue';

export default {
  props: {
      checklist:{
          type: Object,
          required: true
      }
  },
  data() {
    return {
      percent: 30,
      isAdd: false,
    };
  },
  created() {
    console.log(this.checklist);
  },
  methods: {
    log() {
      console.log('yes');
    },
  },
  computed: {
    // checklists() {
    //   return this.$store.getters.checklists;
    // },
  },
  components: { iconBase },
};
</script>

<style></style>
