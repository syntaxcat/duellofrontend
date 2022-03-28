<template>
  <section class="checklist-details" v-if="checklist">
    <div class="header">
      <icon-base class="checklist-icon" iconName="checklist" />
      <div class="container">
        <h3>{{ listToEdit.title }}</h3>
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
      <div class="checklist-item" v-for="todo in listToEdit.todos" :key="todo.id">
        <div
          :class="{ checkbox: true, complete: todo.isDone }"
          @click="
            todo.isDone = !todo.isDone;
            saveChecklist();
            calcDone();
          "
        >
          <span>
            <icon-base iconName="check" :class="{ checked: todo.isDone }" />
          </span>
        </div>

        <div class="todo-details" @click="isEdit = !isEdit">
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
                  <icon-base iconName="member" />
                </button>
              </div>
              <div class="todo-controller" @click="setModalType('delete-todo')">
                <button class="empty">
                  <icon-base iconName="more" />
                </button>
              </div>

              <component :is="modalType" :todo="todo" />
            </div>
          </div>

          <div class="edit-todo"></div>
        </div>
      </div>
    </div>

    <div class="add-todo">
      <button v-if="!isAdd" @click="isAdd = !isAdd">Add an item</button>
      <textarea placeholder="Add an item" v-if="isAdd" v-model="todoToAdd.title"></textarea>

      <div class="add-controls" v-if="isAdd">
        <div class="container">
          <button class="add-btn" @click.stop="addTodo">Add</button>
          <icon-base class="close-btn" iconName="x" @click="isAdd = !isAdd" />
        </div>

        <div class="actions">
          <span>
            <icon-base iconName="member" />
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
import { utilService } from '../services/util.service';
import iconBase from './icon-base.vue';

export default {
  props: {
    checklist: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      length: null,
      areDone: null,
      isAdd: false,
      isEdit: false,
      listToEdit: { ...this.checklist },
      todoToAdd: { id: utilService.makeId(), title: '', isDone: false },
      modalType: '',
    };
  },
  created() {
    this.calcDone();
  },
  methods: {
    setModalType(type) {
      this.modalType = type
    },
    addTodo() {
      if (!this.todoToAdd.title) return;
      this.listToEdit.todos.push(this.todoToAdd);
      this.$emit('save', { ...this.listToEdit });
      this.todoToAdd = { id: utilService.makeId(), title: '', isDone: false };
      this.calcDone();
    },
    saveChecklist() {
      //   console.log('save');
      this.$emit('save', this.listToEdit);
    },
    calcDone() {
      this.length = this.checklist.todos.length;
      const done = this.checklist.todos.filter((todo) => todo.isDone);
      this.areDone = done.length;
    },
  },
  computed: {
    percent() {
      return +((this.areDone / this.length) * 100).toFixed();
    },
  },
  components: { iconBase },
};
</script>

<style></style>
