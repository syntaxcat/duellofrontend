<template>
  <section class="board-group">
    <header>
      {{group.title}}
    </header>

<ul>
  <li v-for="task in group.tasks" :key="task.id">
    <task-preview :task="task" />
  </li>
</ul>    

<button>Add task</button>
  </section>
</template>

<script>
import taskPreview from '../components/task-preview.vue'

export default {
  props:{
    group:{
      type: Object,
      required: true
    }
  },
  components:{taskPreview}

}
</script>

<style>
.board-group{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px;
  height: 150px;
  width: 15rem;
  border: 1px solid black;
  padding: 10px;

}

ul{
  list-style: none;
  padding: 0;
}

ul>li{
  margin-block-end: 5px;
  background-color: rgba(128, 128, 128, 0.233);
}

header{
  text-decoration: underline;
}
</style>