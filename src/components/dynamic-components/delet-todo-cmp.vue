<template>
  <section class="delete-todo-modal">
    <div class="delete-header">
      <span>Item actions</span>
      <icon-base iconName="xs" @click="openModal = !openModal" />
    </div>

    <div>
      <button @click="convertToCard">Convert to card</button>
      <button @click="deleteTodo">Delete</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  methods:{
      deleteTodo(){
          this.$emit('remove', this.todo.id)
      },
      convertToCard(){}
  }
};
</script>

<style></style>
