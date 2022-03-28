<template>
  <section class="checklist-details">
    <div class="header">
      <icon-base class="checklist-icon" iconName="checklist" />
      <div class="container">
        <h3>Checklist name</h3>
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
      <div class="checklist-item">
        <div class="checkbox" :class="{ complete: false }">
          <!-- <div class="checkbox" :class="{ complete: todo.isDone }"> -->
          <span>
            <icon-base iconName="check" :class="{ checked: false }" />
            <!-- <icon-base iconName="check" :class="{ checked: todo.isDone }" /> -->
          </span>
        </div>

        <div class="todo-details">
          <!-- <div class="row"> -->

          <div class="text-and-controls">
            <span>Home</span>
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

          <!-- </div> -->
        </div>
      </div>

      <!-- <div class="checklist-item" v-for="todo in todos" :key="todo.id">
        <div class="checkbox">
          <span>item</span>
        </div>
      </div> -->
    </div>

    <!-- <div class="add-todo">Add item</div> -->
  </section>
</template>

<script>
import iconBase from './icon-base.vue';

export default {
  props: {},
  data() {
    return {
      percent: 30,
    };
  },
  methods: {
      log(){
          console.log('yes');
      }
  },
  computed: {},
  components: { iconBase },
};
</script>

<style></style>
