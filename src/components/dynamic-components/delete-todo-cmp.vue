<template>
  <section class="delete-todo-modal">
    <div class="delete-header">
      <span>Item actions</span>
      <icon-base iconName="xs" @click="close" />
    </div>

    <div>
      <button @click="convertToCard">Convert to card</button>
      <button @click="deleteTodo">Delete</button>
    </div>
  </section>
</template>

<script>
import iconBase from "../icon-base.vue";

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
      convertToCard(){},
      close(){
        this.$emit('close')
      }
  },
  components:{
    iconBase
  }
};
</script>

<style></style>
